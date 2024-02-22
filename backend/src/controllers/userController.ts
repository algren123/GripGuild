import { Request, Response } from 'express';
import prisma from '../prismaInstance';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, supabaseUserId } = req.body;

    console.log(name, email, supabaseUserId);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        providerId: supabaseUserId,
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Failed to create user' });
    }

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;

    const user = await prisma.user.delete({
      where: {
        user_id,
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Failed to delete user' });
    }

    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    console.error(error);
  }
};

export const editUserProfile = async (req: Request, res: Response) => {
  try {
    const { id, name, email } = req.body;

    const user = await prisma.user.update({
      where: {
        user_id: id,
      },
      data: {
        name: name,
        email: email,
      },
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        user_id,
      },
    });

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User found', user });
  } catch (error) {
    console.error(error);
  }
};
