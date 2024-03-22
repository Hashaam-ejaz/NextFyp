import { NextResponse } from 'next/server';
import connectMongoDB from '../../../libs/mongodb';
import User  from '../../../models/users';



export async function POST(req, res) {
    const { name, email, password, address, role, phone, wishlist } = req.body;
    await connectMongoDB();
    await User.create({ name, email, password, address, role, phone, wishlist });
    return NextResponse.json({ message: 'User created' }, { status: 201 });
    // try {
    //     await connectMongoDB();
    //   const newUser = new User(req.body);
    //   await newUser.save();
    //   res.status(201).json(newUser);
    // } catch (error) {
    //   res.status(500).json({ error: 'Error creating user' });
    // }
  }

  export async function GET() {
    await connectMongoDB();
    return NextResponse.json({ message: 'Hello World' });
  }

// export default async function GET(req, res) {
//     try {
//       const users = await User.find();
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching users' });
//     }
//   }

//   export default async function GET(req, res) {
//     try {
//       const { id } = req.query;
//       const user = await User.findById(id);
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(404).json({ error: 'User not found' });
//     }
//   }

//   export default async function PUT(req, res) {
//     try {
//       const { id } = req.query;
//       const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       res.status(404).json({ error: 'User not found' });
//     }
//   }

//   export default async function DELETE(req, res) {
//     try {
//       const { id } = req.query;
//       const deletedUser = await User.findByIdAndDelete(id);
//       res.status(200).json(deletedUser);
//     } catch (error) {
//       res.status(404).json({ error: 'User not found' });
//     }
//   }

