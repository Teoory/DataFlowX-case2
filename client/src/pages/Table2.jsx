import { useState } from 'react';
import { useGetData, usePostData, useUpdateData, useDeleteData } from '../hooks/useApi';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
const Table2 = () => {
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { data: posts, isLoading } = useGetData('/posts', 'posts');
  const addMutation = usePostData('/posts', 'posts');
  const updateMutation = useUpdateData('/posts', 'posts');
  const deleteMutation = useDeleteData('/posts', 'posts');

  const handleAdd = (newData) => {
    addMutation.mutate(newData);
    setOpen(false);
  };

  const handleEdit = (data) => {
    updateMutation.mutate(data);
    setEditItem(null);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div>Yükleniyor...</div>;

  return (
    <div className='container'>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        Yeni Ekle
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Başlık</TableCell>
              <TableCell>İçerik</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts?.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
                <TableCell>
                  <button 
                    className="outlined" 
                    onClick={() => setEditItem(post)}
                  >
                    Düzenle
                  </button>
                  <button 
                    className="outlined" 
                    color="error"
                    onClick={() => handleDelete(post.id)}
                  >
                    Sil
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open || !!editItem} onClose={() => {
        setOpen(false);
        setEditItem(null);
      }}>
        <DialogTitle>
          {editItem ? 'Gönderi Düzenle' : 'Yeni Gönderi Ekle'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              title: formData.get('title'),
              body: formData.get('body'),
              ...(editItem && { id: editItem.id })
            };
            editItem ? handleEdit(data) : handleAdd(data);
          }}>
            <TextField
              margin="normal"
              fullWidth
              label="Başlık"
              name="title"
              defaultValue={editItem?.title || ''}
            />
            <TextField
              margin="normal"
              fullWidth
              label="İçerik"
              name="body"
              multiline
              rows={4}
              defaultValue={editItem?.body || ''}
            />
            <DialogActions>
              <Button onClick={() => {
                setOpen(false);
                setEditItem(null);
              }}>
                İptal
              </Button>
              <Button type="submit" variant="contained">
                {editItem ? 'Güncelle' : 'Ekle'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Table2; 