import * as Yup from 'yup';

import { FILE_SIZE, SUPPORTED_FORMATS } from '../../config/constants';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      file: Yup.mixed()
        .required('O Banner é obrigatório')
        .test(
          'fileSize',
          'A imagem é muito grande',
          value => value && value.size <= FILE_SIZE
        )
        .test(
          'fileFormat',
          'Formato da imagem não suportado',
          value => value && SUPPORTED_FORMATS.includes(value.mimetype)
        ),
    });

    await schema.validate(req, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
