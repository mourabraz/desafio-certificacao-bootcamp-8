import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

class DeleteSubscriptionService {
  async run({ subscription_id, user_id }) {
    const subscription = await Subscription.findByPk(subscription_id);

    /**
     * Check if subscription id exists and belongs to authenticated user
     */
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    if (subscription.user_id !== user_id) {
      throw new Error('Request not permitted');
    }

    /**
     * Check if subscription is already gonne
     */
    const meetup = await Meetup.findByPk(subscription.meetup_id);
    if (meetup && meetup.past) {
      throw new Error('Cancel Subscription on a past meetup is not allowed');
    }

    const deletedRows = await Subscription.destroy({
      where: { id: subscription.id },
    });

    return deletedRows;
  }
}

export default new DeleteSubscriptionService();
