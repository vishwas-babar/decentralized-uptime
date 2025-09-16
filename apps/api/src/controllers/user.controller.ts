import prisma from "@repo/db";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { LoginUserSchema, RegisterUserSchema } from "@repo/schema";
import { generateToken } from "../utils/jwt";

const handleLoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const validate = LoginUserSchema.safeParse({ email, password });
    if (!validate.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: validate.error.issues.map(e => e.message),
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const handleRegisterUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const validate = RegisterUserSchema.safeParse({ name, email, password });
    if (!validate.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: validate.error.issues.map(e => e.message),
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getSessionUser = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
      },
    });
  } catch (error) {
    console.error("Session error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { handleLoginUser, handleRegisterUser, getSessionUser };
