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

const Table1 = () => {
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { data: users, isLoading } = useGetData('/users', 'users');
  const addMutation = usePostData('/users', 'users');
  const updateMutation = useUpdateData('/users', 'users');
  const deleteMutation = useDeleteData('/users', 'users');

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
              <TableCell>İsim</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <button 
                    className="outlined" 
                    onClick={() => setEditItem(user)}
                  >
                    Düzenle
                  </button>
                  <button 
                    className="outlined" 
                    color="error"
                    onClick={() => handleDelete(user.id)}
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
          {editItem ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              name: formData.get('name'),
              email: formData.get('email'),
              ...(editItem && { id: editItem.id })
            };
            editItem ? handleEdit(data) : handleAdd(data);
          }}>
            <TextField
              margin="normal"
              fullWidth
              label="İsim"
              name="name"
              defaultValue={editItem?.name || ''}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              type="email"
              defaultValue={editItem?.email || ''}
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

export default Table1; 