import { getAllSpaces, getSpaceById, createSpace, updateSpace, deleteSpace } from "../services/spaceService";

export const SpaceController = {
  async list(req, res) {
    try {
      const spaces = await getAllSpaces();
      res.json(spaces);
    } catch (error) {
      res.status(500).json({ error: "Error fetching spaces" });
    }
  },

  async getOne(req, res) {
    try {
      const space = await getSpaceById(req.params.id);
      if (!space) return res.status(404).json({ error: "Space not found" });
      res.json(space);
    } catch (error) {
      res.status(500).json({ error: "Error fetching space" });
    }
  },

  async create(req, res) {
    try {
      const newSpace = await createSpace(req.body);
      res.status(201).json(newSpace);
    } catch (error) {
      res.status(500).json({ error: "Error creating space" });
    }
  },

  async update(req, res) {
    try {
      const updatedSpace = await updateSpace(req.params.id, req.body);
      res.json(updatedSpace);
    } catch (error) {
      res.status(500).json({ error: "Error updating space" });
    }
  },

  async delete(req, res) {
    try {
      await deleteSpace(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error deleting space" });
    }
  },
};
