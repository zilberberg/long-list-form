import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import { useUsersContext } from '../../context/usersContext';
import { useEffect, useState } from 'react';
import { userInterface } from '../../data/userInterface';
import { v4 as uuidv4 } from 'uuid';

function UsersPage() {
  const { usersData, setUsersData } = useUsersContext();
  const [ updatedUsers, setUpdatedUsers ] = useState([]);
  const [ usersDataState, setUsersDataState ] = useState([]);
  const [ usersErrors, setUsersErrors ] = useState([]);

  useEffect(() => {
    setUsersDataState(usersData);
  }, [usersData])

  const handleAdd = () => {
    const newUser = {...userInterface, id: uuidv4()};
    setUpdatedUsers([...updatedUsers, newUser]);
    setUsersDataState([newUser, ...usersDataState]);
  }

  const handleUserEdit = (id, name, value) => {
    let user = usersDataState.find(user => user.id == id);
    user[name] = value;
    let updatedUser = updatedUsers.find(user => {user.id == id});
    if (updatedUser) {
      updatedUser = user;
      setUpdatedUsers([...updatedUsers]);
    } else {
      setUpdatedUsers([...updatedUsers, user]);
    }
    setUsersDataState([...usersDataState]);
  }

  const handleSave = () => {
    if (!validateData()) {
      setUsersData([...usersData, ...updatedUsers]);
    }
  }

  const validateData = () => {
    let errors = [];
    updatedUsers.forEach(updatedUser => {
      let userErrors = [];
      Object.keys(userInterface).forEach(dataKey => {
        if (!updatedUser[dataKey].length) {
          userErrors.push(dataKey);
        }
      })
      if (userErrors.length) {
        errors.push({id: updatedUser.id, userErrors});
      }
      userErrors = [];
    })
    setUsersErrors(errors);
    return errors.length;
  }

  const handleDelete = (id) => {
    setUsersData([...usersData.filter(user => user.id != id)]);
  }

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList 
          usersData={usersDataState}
          handleAdd={handleAdd}
          handleUserEdit={handleUserEdit}
          usersErrors={usersErrors}
          onDelete={handleDelete}
        />
        <div className={styles.rightButtonContainer}>
          <PrimaryButton
            disabled={false}
            handleClick={handleSave}
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
