import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import { useUsersContext } from '../../context/usersContext';
import { useEffect, useState } from 'react';
import { userInterface } from '../../data/userInterface';
import { v4 as uuidv4 } from 'uuid';
import validateObject, { ERROR_TYPES } from '../../utils/validator';

function UsersPage() {
  const { usersData, setUsersData } = useUsersContext();
  const [ updatedUsers, setUpdatedUsers ] = useState([]);
  const [ usersDataState, setUsersDataState ] = useState([]);
  const [ errors, setErrors ] = useState([]);
  const [ invalidCount, setInvalidCount ] = useState(0);
  const [ emptyCount, setEmptyCount ] = useState(0);
  const [ dataFetched, setDataFetched ] = useState(false);

  useEffect(() => {
    if (usersData.length && !dataFetched) {
      setUsersDataState(usersData);
      setDataFetched(true);
    }
  }, [usersData]);

  const handleAdd = () => {
    const newUser = {...userInterface, id: uuidv4()};
    setUsersDataState([newUser, ...usersDataState]);
  }

  const updateErrors = (error, id, key) => {
    if (error) {
      if (error.type == ERROR_TYPES.INVALID) {
        setInvalidCount(invalidCount+1);
      } else {
        setEmptyCount(emptyCount+1);
      }
      setErrors([...errors.filter(e => ({id: e.id, key: e.key} !== {id: error.id, key: error.key})), error]);
    } else {
      const filteredErrors = errors.filter(e => {
        return !(e.id === id && e.key === key);
      });
      const errorToRemove = errors.find(e => {
        return (e.id === id && e.key === key);
      });
      if (errorToRemove) {
        if (errorToRemove.type == ERROR_TYPES.INVALID) {
          setInvalidCount(invalidCount-1);
        } else {
          setEmptyCount(emptyCount-1);
        }
        setErrors(filteredErrors);
      }
    }
  }

  const handleUserEdit = (id, key, value, error) => {
    updateErrors(error, id, key);
    let user = usersDataState.find(user => user.id == id);
    user[key] = value;
    let updatedUser = updatedUsers.find(user => user.id == id);
    if (updatedUser) {
      updatedUser = user;
      setUpdatedUsers([...updatedUsers]);
    } else {
      setUpdatedUsers([...updatedUsers, user]);
    }
    setUsersDataState([...usersDataState]);
  }

  const handleSave = () => {
    const hasErrors = validateSave();
    if (!hasErrors && !invalidCount && !emptyCount) {
      const filteredUsers = usersData.filter(user => !(updatedUsers.map(uu => uu.id).includes(user.id)));
      setUsersData([...filteredUsers, ...updatedUsers]);
    }
  }

  const validateSave = () => {
    for (const user of updatedUsers) {
      for (const key in user) {
        const error = validateObject(user.id, key, user[key]);
        if (!!error) {
          return true;
        }
      }
    }
    return false;
  }

  const handleDelete = (id) => {
    setUsersData([...usersDataState.filter(user => user.id != id)]);
    setUsersDataState([...usersDataState.filter(user => user.id != id)]);
    let updatedUser = updatedUsers.find(user => user.id == id);
    if (updatedUser) {
      const filteredUpdatedUsers = updatedUsers.filter(user => user.id != id);
      setUpdatedUsers(filteredUpdatedUsers);
    }
  }

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList 
          usersData={usersDataState}
          handleAdd={handleAdd}
          handleUserEdit={handleUserEdit}
          errors={errors}
          onDelete={handleDelete}
        />
        <div className={styles.rightButtonContainer}>
          <div className={styles.errorsContainer}>
            {invalidCount > 0 && <span className={styles.errorContainer}>Invalid Fields - {invalidCount}</span>}
            {emptyCount > 0 && <span>Empty Fields - {emptyCount}</span>}
          </div>
          <PrimaryButton
            disabled={invalidCount || emptyCount}
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
