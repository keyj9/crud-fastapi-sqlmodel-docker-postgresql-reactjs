/* eslint-disable */
import {
    AppBar,
    Toolbar,
    Button,
    TableRow,
    TableCell,
    Table,
    TableContainer, TableBody, TextField
}
from "@material-ui/core";
import {
    useState,
} from 'react';
import axios from "axios";
function App() {

    const [user, setUser] = useState({
        id: 0,
        name: '',
        email: '',
        password: ''
    })
    const [users, setUsers] = useState([])

  // const [users, setUsers] = useState([])
  // const [user, setUser] = useState([])
  const fetchUsers = async () =>{
      const response = await axios.get('http://127.0.0.1:8000/')
      return setUsers(response.data)
  }
    // fetchUsers()
    const fetchUser  = async () =>{
      const response = await axios.get('http://127.0.0.1:8000/${user.id}')
      return setUsers(response.data)
    }
    const createOrEditUser  = async () => {
        if (user.id) {
            await axios.put('http://127.0.0.1:8000/${user.id}', user)
        } else {
            await axios.post('http://127.0.0.1:8000/', user)
        }
        await fetchUsers()
        // await setUser({id: 0, name: '', email: '', password: ''})
    }
    const deleteUser  = async () =>{
      await axios.put('http://127.0.0.1:8000/${user.id}', user)
        await fetchUsers()
    }
  return (
    <div>
        <AppBar position="static">
          <Toolbar>
              <Button color="inherit">users</Button>
          </Toolbar>
        </AppBar>
             <TableContainer>
                 <TextField value={user.id} type="hidden"/>
                  <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField value={user.name} onChange={(e) => setUser({...user, name:e.target.value})} label="Name" />
                            </TableCell>
                             <TableCell>
                                <TextField value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} label="Email" />
                            </TableCell>
                            <TableCell>
                                <TextField value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} label="Password" />
                            </TableCell>
                            <TableCell>
                                <Button onClick={()=> createOrEditUser()} variant="contained" color="primary">
                                 Submit
                                 </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Password</TableCell>
                              <TableCell>Edit</TableCell>
                              <TableCell>Delete</TableCell>
                        </TableRow>
                        {users.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell >{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>
                                    <Button onClick={()=> fetchUser(row.id)} variant="contained" color="primary">
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={()=> deleteUser(row.id)} variant="contained" color="secondary">
                                        Delete
                                    </Button></TableCell>
                            </TableRow>
                      ))}
                    </TableBody>
                  </Table>
             </TableContainer>
    </div>
  );
}
export default App;
