/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput({ name }) {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [hasError, setHasError] = useState(!!error);
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    setHasError(!!error);
  }, [error]);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, fieldName]);

  async function handleChange(e) {
    try {
      const data = new FormData();

      data.append('file', e.target.files[0]);

      const response = await api.post('/banners', data);

      const { id, url } = response.data;

      setFile(id);
      setPreview(url);
      setHasError(false);
    } catch (err) {
      console.log(err);
      toast.error(`Oops... alguma coisa correu mal!\nerror:${err}`);
    }
  }

  return (
    <Container>
      <label htmlFor="banner_id">
        {preview ? (
          <img src={preview} alt="Banner" />
        ) : (
          <span>Selecionar imagem</span>
        )}

        <input
          name={fieldName}
          type="file"
          id="banner_id"
          accept="images/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
      {error && hasError && <span>{error}</span>}
    </Container>
  );
}

BannerInput.propTypes = {
  name: PropTypes.string.isRequired,
};
