import cloudinary from '@/config/cloudinary.config';
import connectDb from '@/config/db.config';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

/**
 * Route: GET /api/properties
 *
 * @return {Promise<{properties: Property}>}
 */
export const GET = async () => {
  try {
    await connectDb();

    const properties = await Property.find({});

    return new Response(JSON.stringify({ properties }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response('Something went wrong', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDb();
    const userSession = await getSessionUser();

    if (!userSession || !userSession.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const authUserId = userSession.userId;

    const formData = await request.formData();

    const amenities = formData.getAll('amenities');
    const images = formData
      .getAll('images')
      .filter((image) => image.name !== '');

    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: authUserId,
    };

    const imagesUploadPromises = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString('base64');
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: 'propertypulse',
        }
      );

      imagesUploadPromises.push(result.secure_url);

      const uploadedImages = await Promise.all(imagesUploadPromises);

      propertyData.images = uploadedImages;
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );

    // return new Response(JSON.stringify({ message: 'Success' }), {
    //   status: 201,
    // });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
