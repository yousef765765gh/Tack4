import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem } from '../../services/api';
import { Item } from '../../types';
import './ShowItem.css';
import { CircleArrowLeft } from 'lucide-react';

const DEFAULT_IMAGE = '/assets/img/image 2.png';

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ShowItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItem(Number(id));
        setItem(data);
      } catch {
        navigate('/dashboard/products');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, navigate]);

  if (loading) return <div className="show-loading">Loading...</div>;
  if (!item) return null;

  return (
    <div className="show-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <CircleArrowLeft size={20} />
      </button>

      <h1 className="show-title">{item.name}</h1>

      <div className="show-content">
        <div className="show-image-wrapper">
          <img
            src={item.image_url}
            alt={item.name}
            className="show-image"
            onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE; }}
          />
        </div>

        <div className="show-meta">
          <div className="meta-row">
            <div className="meta-item">
              <span className="meta-label">Price:</span>
              <span className="meta-value">{item.price}$</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Added At:</span>
              <span className="meta-value">{formatDate(item.created_at)}</span>
            </div>
          </div>
          <div className="meta-row center">
            <div className="meta-item">
              <span className="meta-label">Updated At:</span>
              <span className="meta-value">{formatDate(item.updated_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowItem;