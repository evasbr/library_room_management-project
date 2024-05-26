const { PrismaClient } = require('@prisma/client');
const bycrypt = require('bcrypt');

const prisma = new PrismaClient();

const createUser = async (req, res, next) => {
  try {
    const {
      code_member, name, email, password, address
    } = req.body;

    const newPassword = await bycrypt.hash(password, 10);

    const newUser = await prisma.member.create({
      data: {
        code_member,
        name,
        email,
        password: newPassword,
        address,
      },
    });

    return res.status(201).json({
      message: 'User baru berhasil ditambahan',
      data: newUser,
    });
  } catch (error) {
    return next(error);
  }
};

const seeAllUser = async (req, res, next) => {
  try {
    const users = await prisma.member.findMany();

    return res.status(201).json({
      data: users,
    });
  } catch (error) {
    return next(error);
  }
};

const findUserByEmail = async (req, res, next) => {
  try {
    const { searchEmail } = req.query;
    const user = await prisma.member.findUnique(
      {
        where: {
          email: searchEmail,
        },
      },
    );

    if (!user) {
      return res.status(201).json({
        message: 'Data member tidak ditemukan',
      });
    }

    return res.status(201).json({
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const codeMember = req.params.code_member;

    const isUserExist = await prisma.member.findUnique(
      {
        where: {
          code_member: codeMember,
        },
      },
    );

    if (!isUserExist) {
      return res.status(404).json({
        message: 'Member tidak ditemukan',
      });
    }

    const {
      name, email, password, address,
    } = req.body;

    const newUser = await prisma.member.update(
      {
        where: {
          code_member: codeMember,
        },
        data: {
          name,
          email,
          password,
          address,
        },
      },
    );

    return res.status(201).json({
      data: newUser,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser, seeAllUser, findUserByEmail, updateUserInfo,
};
