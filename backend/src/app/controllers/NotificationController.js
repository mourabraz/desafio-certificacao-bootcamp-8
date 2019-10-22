import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const notifications = await Notification.find({
      owner: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { read: true }
    );

    if (!notification) {
      throw new Error('Bad request');
    }

    return res.json(notification);
  }
}

export default new NotificationController();
