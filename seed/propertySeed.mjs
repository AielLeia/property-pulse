import 'dotenv/config'
import cloudinary from '../config/cloudinary.config.js';
import connectDb, {disconnectDb} from "../config/db.config.js";
import User from "../models/User.js";
import {
	randAddress,
	randBoolean,
	randNumber,
	randPhoneNumber,
	randProductName,
	randSentence,
	seed
} from "@ngneat/falso";
import Property from "../models/Property.js";
import _ from 'lodash'

const propertySeed = async () => {
	await connectDb()

	await Property.deleteMany();

	const allRemoteImages = await cloudinary.search
		.expression('folder:propertypulse/*')
		.execute();
	let imagesUrls = allRemoteImages.resources.map((image) => image.secure_url);

  const users = await User.find({});
  const usersId = users.map(userId => userId._id.toString())

  let maxProperties = randNumber({ min: 10, max: 100 });

	while (maxProperties > 0) {
		seed();
		imagesUrls = _.shuffle(imagesUrls)
    maxProperties--;

		const amenitiesTypes = [
			'Wifi',
			'Full kitchen',
			'Washer & Dryer',
			'Free Parking',
			'Swimming Pool',
			'Hot Tub',
			'24/7 Security',
			'Wheelchair Accessible',
			'Elevator Access',
			'Dishwasher',
			'Gym/Fitness Center',
			'Air Conditioning',
			'Balcony/Patio',
			'Smart TV',
			'Coffee Maker',
		]
		const amenities = [...amenitiesTypes].splice(0, randNumber({min: 1, max: amenitiesTypes.length - 1}))
		const images = [...imagesUrls].splice(0, randNumber({ min: 1, max: imagesUrls.length - 1}))
		const randomUserIndex = randNumber({ min: 0, max: 1 });
		const userId = usersId[randomUserIndex]
		const user = users[randomUserIndex];
		const types = [
			'Apartment',
			'Condo',
			'House',
			'Cabin or Cottage',
			'Room',
			'Studio',
			'Other',
		];
		const typeIndex = Math.floor(Math.random() * types.length)

		const location = {
			street: '17 Boulevard d\'anjou',
			city: 'France',
			state: 'Rennes',
			zipCode: '35000'
		}

		const propertyData = {
			type: types[typeIndex],
			name: randProductName({ length: 1 }).join(' '),
			description: randSentence({ length: 3 }).join('\n'),
			location: {
				street: location.street,
				city: location.city,
				state: location.county,
				zipcode: location.zipCode,
			},
			beds: randNumber({min: 1, max: 6 }),
			baths: randNumber({ min: 1, max: 4 }),
			square_feet: randNumber({ min: 120, max: 3000}),
			amenities,
			rates: {
				weekly: randBoolean() ? randNumber({ min: 300, max: 1000 }) : null,
				monthly: randNumber({ min: 1000, max: 10000}),
				nightly: randBoolean() ? randNumber({ min: 10, max: 300 }) : null,
			},
			seller_info: {
				name: user.username,
				email: user.email,
				phone: randPhoneNumber({ countryCode: 'FR' }),
			},
			owner: userId,
			images
		};

		const property = new Property(propertyData);
		await property.save()
		console.log(property._id, property.images.filter(image => image === undefined))
  }
};

propertySeed().then(() => {
  process.exit(0)
}).finally(async () => {
  await disconnectDb()
});
