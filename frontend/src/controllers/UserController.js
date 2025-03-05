import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../services/userService";

export const UserController = {
  async list(req, res) {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  },

  async getOne(req, res) {
    try {
      const user = await getUserById(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user" });
    }
  },

  async create(req, res) {
    try {
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  },

  async update(req, res) {
    try {
      const updatedUser = await updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Error updating user" });
    }
  },

  async delete(req, res) {
    try {
      await deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  },
};
