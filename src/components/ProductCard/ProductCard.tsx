import { useNavigate } from 'react-router-dom';
import { Item } from '../../types';
import './ProductCard.css';

const DEFAULT_IMAGE = '/assets/img/image 2.png';

interface Props {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

const ProductCard = ({ item, onEdit, onDelete }: Props) => {
  const navigate = useNavigate();

  const imageSrc = item.image_url
    ? item.image_url.startsWith('http')
      ? item.image_url
      : `https://dashboard-i552.onrender.com/${item.image_url}`
    : DEFAULT_IMAGE;

  function handleCardClick() {
    navigate(`/dashboard/products/${item.id}`);
  }

  function handleEdit(e: React.MouseEvent) {
    e.stopPropagation();
    onEdit(item);
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    onDelete(item);
  }

  return (
    <div className="product-card">
      <div className="card-image-wrapper" onClick={handleCardClick}>
        <img
          src={imageSrc}
          alt={item.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
          className="card-image"
        />
        <div className="card-overlay">
          <p className="card-name">{item.name}</p>
          <div className="card-actions">
            <button className="overlay-btn edit-btn" onClick={handleEdit}>Edit</button>
            <button className="overlay-btn delete-btn" onClick={handleDelete}>delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;