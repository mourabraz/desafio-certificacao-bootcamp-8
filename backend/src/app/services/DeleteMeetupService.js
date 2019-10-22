import Meetup from '../models/Meetup';

class DeleteMeetupService {
  async run({ meetup_id, user_id }) {
    const meetup = await Meetup.findByPk(meetup_id);

    /**
     * Check if meetup id exists and belongs to authenticated user
     */
    if (!meetup) {
      throw new Error('Meetup not found');
    }
    if (meetup.user_id !== user_id) {
      throw new Error('Request not permitted');
    }

    /**
     * Check if meetup is already gonne
     */
    if (meetup.past) {
      throw new Error('Delete a past meetup is not allowed');
    }

    const deletedRows = await Meetup.destroy({ where: { id: meetup.id } });

    return deletedRows;
  }
}

export default new DeleteMeetupService();
