import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class NewSubscriberMail {
  get key() {
    return 'NewSubscriberMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.owner.name} <${meetup.owner.email}>`,
      subject: 'Novo subscrito no Meetup',
      template: 'NewSubscriber',
      context: {
        owner: meetup.owner.name,
        meetup: meetup.title,
        date: format(parseISO(meetup.date), "dd 'de' MMMM', às' HH'h'", {
          locale: pt,
        }),
        subscriber: user.name,
      },
    });
  }
}

export default new NewSubscriberMail();
