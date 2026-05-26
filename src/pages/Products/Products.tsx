import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItems, deleteItem } from '../../services/api';
import { Item } from '../../types';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import './Products.css';
import { Search } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

const Products = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getItems(currentPage, debouncedSearch);
      if (Array.isArray(data)) {
        const filtered = debouncedSearch
          ? data.filter((item: Item) =>
              item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
            )
          : data;
        const total = Math.ceil(filtered.length / ITEMS_PER_PAGE);
        setTotalPages(total || 1);
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        setItems(filtered.slice(start, start + ITEMS_PER_PAGE));
      } else {
        setItems(data.data || []);
        setTotalPages(data.last_page || 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteItem(deleteTarget.id);
      setDeleteTarget(null);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search product by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="search-icon" size={16} color="#aaa" />
        </div>
        <button
          className="add-btn"
          onClick={() => navigate('/dashboard/products/add')}
        >
          ADD NEW PRODUCT
        </button>
      </div>

      {loading ? (
        <div className="products-loading">Loading...</div>
      ) : items.length === 0 ? (
        <div className="products-empty">No products found</div>
      ) : (
        <div className="products-grid-wrapper">
          <div className="products-grid">
            {items.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onEdit={(i) => navigate(`/dashboard/products/${i.id}/edit`)}
                onDelete={(i) => setDeleteTarget(i)}
              />
            ))}
          </div>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {deleteTarget && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default Products;