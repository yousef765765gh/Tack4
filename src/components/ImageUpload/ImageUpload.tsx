import { useRef } from 'react';
import './ImageUpload.css';

interface Props {
  preview: string | null;
  onChange: (file: File) => void;
}

const ImageUpload = ({ preview, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  }

  return (
    <div className="image-upload-box" onClick={handleClick}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      {preview ? (
        <img src={preview} alt="Preview" className="upload-preview" />
      ) : (
        <div className="upload-placeholder">
          <img src="/assets/img/Upload icon.png" alt="" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;