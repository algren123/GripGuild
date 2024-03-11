import { Request, Response } from 'express';
import prisma from '../prismaInstance';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, providerId, avatarUrl } = req.body;

    console.log(req.body);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        providerId,
        avatarUrl,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Failed to create user', user: null });
    }

    console.log('User created successfully');
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
    // @ts-ignore
    const { email } = req.query as string;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return res
      .status(200)
      .json({ message: user ? 'User found' : 'User not found', user });
  } catch (error) {
    console.error(error);
  }
};
