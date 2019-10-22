module.exports = {
  up: queryInterface => {
    const today = new Date();

    return queryInterface.bulkInsert(
      'meetups',
      [
        {
          user_id: 1,
          title: 'Grande encontro com postits',
          description:
            'Meetup de qualquer coisa sobre postits, venha participar!\nEntrada franca.',
          localization: 'Lisboa - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 2,
            15,
            0,
            0
          ),
          banner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          title: 'Meetup dos Meetups',
          description:
            'Meetup dos meetups!\nEntrada franca para desenvolvedores.\nMais informações pelo telefone 999.999.999',
          localization: 'Forum de Guimarães - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 1,
            10,
            0,
            0
          ),
          banner_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Novo método de estudos rápido',
          description: 'Aprenda a aprender rápido com as técnicas deste cara!',
          localization: 'Rua das Couves lote 6 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            8,
            0,
            0
          ),
          banner_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Lorem ipsum dolor sit amet.',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis fermentum diam eget pellentesque. Maecenas ipsum velit, aliquet non rutrum in, rutrum ac sapien. Ut sagittis neque vitae facilisis vulputate. Sed at quam nibh. Etiam scelerisque ultrices consectetur.\nVestibulum molestie elementum enim sit amet interdum. Donec cursus lorem et nunc tincidunt faucibus. Curabitur iaculis sagittis risus ut tristique. Nulla orci odio, pharetra non lectus nec, bibendum pharetra metus. Mauris tempor tellus eu tellus aliquam pellentesque. Sed eget imperdiet arcu, ac ullamcorper neque. Phasellus ac scelerisque elit. In ut euismod odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          localization:
            'Rua das novelas das 9 nº 21 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            9,
            0,
            0
          ),
          banner_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Vivamus non arcu in dui congue cursus.',
          description:
            'Morbi justo enim, pharetra eget efficitur quis, ullamcorper scelerisque nibh. Aenean convallis justo nec tincidunt suscipit. Curabitur elementum et diam ac tempor. Maecenas egestas metus ut leo tempus fringilla. Cras viverra nisi vehicula ante feugiat, id suscipit lacus scelerisque. Nulla et nunc id dui accumsan posuere lobortis eu risus. Etiam maximus erat ante.',
          localization: 'Rua das Couves lote 6 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            10,
            0,
            0
          ),
          banner_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title:
            'Maecenas nec est ut magna pharetra vulputate. Praesent eu tortor ex.',
          description:
            'Donec cursus lorem et nunc tincidunt faucibus. Curabitur iaculis sagittis risus ut tristique. Nulla orci odio, pharetra non lectus nec, bibendum pharetra metus. Mauris tempor tellus eu tellus aliquam pellentesque. Sed eget imperdiet arcu, ac ullamcorper neque. Phasellus ac scelerisque elit. In ut euismod odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          localization: 'Rua das Couves lote 6 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            11,
            0,
            0
          ),
          banner_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Aliquam sagittis fermentum diam eget pellentesque',
          description:
            'Maecenas egestas metus ut leo tempus fringilla. Cras viverra nisi vehicula ante feugiat, id suscipit lacus scelerisque. Nulla et nunc id dui accumsan posuere!',
          localization: 'Rua das Couves lote 6 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            12,
            0,
            0
          ),
          banner_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Aliquam sagittis fermentum diam eget pellentesque',
          description:
            'Maecenas egestas metus ut leo tempus fringilla. Cras viverra nisi vehicula ante feugiat, id suscipit lacus scelerisque. Nulla et nunc id dui accumsan posuere!',
          localization: 'Rua das Couves lote 6 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            14,
            0,
            0
          ),
          banner_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Lorem ipsum dolor sit amet.',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis fermentum diam eget pellentesque. Maecenas ipsum velit, aliquet non rutrum in, rutrum ac sapien. Ut sagittis neque vitae facilisis vulputate. Sed at quam nibh. Etiam scelerisque ultrices consectetur.\nVestibulum molestie elementum enim sit amet interdum. Donec cursus lorem et nunc tincidunt faucibus. Curabitur iaculis sagittis risus ut tristique. Nulla orci odio, pharetra non lectus nec, bibendum pharetra metus. Mauris tempor tellus eu tellus aliquam pellentesque. Sed eget imperdiet arcu, ac ullamcorper neque. Phasellus ac scelerisque elit. In ut euismod odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          localization:
            'Rua das novelas das 9 nº 21 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            15,
            0,
            0
          ),
          banner_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Lorem ipsum dolor sit amet.',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis fermentum diam eget pellentesque. Maecenas ipsum velit, aliquet non rutrum in, rutrum ac sapien. Ut sagittis neque vitae facilisis vulputate. Sed at quam nibh. Etiam scelerisque ultrices consectetur.\nVestibulum molestie elementum enim sit amet interdum. Donec cursus lorem et nunc tincidunt faucibus. Curabitur iaculis sagittis risus ut tristique. Nulla orci odio, pharetra non lectus nec, bibendum pharetra metus. Mauris tempor tellus eu tellus aliquam pellentesque. Sed eget imperdiet arcu, ac ullamcorper neque. Phasellus ac scelerisque elit. In ut euismod odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          localization:
            'Rua das novelas das 9 nº 21 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            16,
            0,
            0
          ),
          banner_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Phasellus tincidunt non tortor vitae elementum',
          description:
            'Curabitur eleifend, purus pellentesque condimentum maximus, ex ligula laoreet tellus, vitae dictum massa felis finibus sapien. Suspendisse feugiat accumsan nibh sed consectetur. In hac habitasse platea dictumst. Pellentesque vel ultricies elit. Nam et urna massa. Cras vel leo eu orci congue dictum a eu risus. Suspendisse potenti. Morbi magna velit, laoreet in vulputate nec, faucibus non lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus tincidunt non tortor vitae elementum.',
          localization: 'Rua das Couves lote 6 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            17,
            0,
            0
          ),
          banner_id: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title:
            'Sed eros est, cursus sit amet eros nec, volutpat dignissim diam',
          description:
            'Quisque sed lacus sollicitudin, porta augue at, feugiat erat. Etiam tincidunt enim ac ullamcorper egestas.',
          localization: 'Rua das Couves lote 6 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            18,
            0,
            0
          ),
          banner_id: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Suspendisse ullamcorper',
          description:
            'Suspendisse potenti. Morbi magna velit, laoreet in vulputate nec, faucibus non lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus tincidunt non tortor vitae elementum.',
          localization: 'Rua das Couves lote 6 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            19,
            0,
            0
          ),
          banner_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Quisque sed lacus sollicitudin, porta augue at',
          description:
            'In hac habitasse platea dictumst. Pellentesque vel ultricies elit. Nam et urna massa. Cras vel leo eu orci congue dictum a eu risus. Suspendisse potenti. Morbi magna velit, laoreet in vulputate nec, faucibus non lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\n\nPhasellus tincidunt non tortor vitae elementum.',
          localization: 'Rua das Couves lote 6 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            20,
            0,
            0
          ),
          banner_id: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'A união faz a força (e cria vontades!)',
          description:
            'Meeup com experts da área da Força! Incentive a sua equipe a unir-se pelo propósito comum do grupo e o foguete será lançado!',
          localization:
            'Rua Francisco Almeida Grandela nº 60 - Aveiras de Cima - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1,
            17,
            0,
            0
          ),
          banner_id: 12,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          title: 'Grande encontro com postits Parte II',
          description:
            'O Sucesso vez repetir!\nMeetup de qualquer coisa sobre postits, venha participar!\nEntrada franca.',
          localization: 'Lisboa - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1,
            17,
            0,
            0
          ),
          banner_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          title: 'Meetup dos Meetups o Retorno',
          description:
            'Meetup dos meetups! Foi um sucesso, daí voltamos com mais uma edição!\nEntrada franca para desenvolvedores.\nMais informações pelo telefone 999.999.999',
          localization: 'Forum de Guimarães - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1,
            16,
            0,
            0
          ),
          banner_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Novo método de estudos rápido Volta de novo',
          description:
            "Muito requisitada a volta deste Meetup. Infelizmente ocorrerá à mesma hora que o 'Meetup dos Meetups o Retorno'. Aprenda a aprender rápido com as técnicas deste cara!",
          localization: 'Rua das Couves lote 6 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1,
            16,
            0,
            0
          ),
          banner_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Lorem ipsum dolor sit amet. Versão 2.0',
          description:
            'Voltamos!\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis fermentum diam eget pellentesque. Maecenas ipsum velit, aliquet non rutrum in, rutrum ac sapien. Ut sagittis neque vitae facilisis vulputate. Sed at quam nibh. Etiam scelerisque ultrices consectetur.\nVestibulum molestie elementum enim sit amet interdum. Donec cursus lorem et nunc tincidunt faucibus. Curabitur iaculis sagittis risus ut tristique. Nulla orci odio, pharetra non lectus nec, bibendum pharetra metus. Mauris tempor tellus eu tellus aliquam pellentesque. Sed eget imperdiet arcu, ac ullamcorper neque. Phasellus ac scelerisque elit. In ut euismod odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          localization:
            'Rua das novelas das 9 nº 21 - Vale da Pinta - Portugal',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 2,
            11,
            0,
            0
          ),
          banner_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Direto da Venezuela - El Chavo del Ocho',
          description:
            'Importante seriado de televisão mexicano criado por Roberto Gómez Bolaños\nA cultura popular de El Chavo del Ocho continua com o status de ser um dos melhores programas de entretenimento, um dos mais reconhecidos e continua sendo uma das séries com mais sucesso na televisão latino-americana.\n\n\n(fonte: https://pt.wikipedia.org/wiki/El_Chavo_del_Ocho)',
          localization: 'Vila do chaves, casa 71 - Acapulco - Venezuela',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 2,
            17,
            0,
            0
          ),
          banner_id: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('meetups', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
