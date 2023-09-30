import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';
import validateObject from '../../../utils/Validator';

const IGNORED_DATA_KEYS = ['id'];

const UserRow = ({ user, onEdit, onDelete, errors }) => {
  const onHandleChange = (id, key, value) => {
    const error = validateObject(id, key, value);
    onEdit(id, key, value, error);
  }

  const inputHasErrors = (key) => {
    return !!errors.find(error => error.key == key);
  }

  return (
    <Grid container className={styles.userRow} style={{display: "flex", flexDirection: "row"}}>
      {
        Object.keys(user).map((dataKey, index) => {
          if (!IGNORED_DATA_KEYS.includes(dataKey)) {
            return (
              <InputField
                key={index}
                name={dataKey}
                value={user[dataKey]}
                onChangehandler={onHandleChange}
                placeholder={dataKey}
                id={user.id}
                error={inputHasErrors(dataKey)}
              />
            )
          }
        })
      }
      <TrashIconButton handleClick={onDelete} id={user.id}/>
    </Grid>
  );
};

export default UserRow;
