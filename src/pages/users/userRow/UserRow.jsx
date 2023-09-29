import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';

const IGNORED_DATA_KEYS = ['id'];

const UserRow = ({ user, onEdit, onDelete, errors }) => {
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
                onChangehandler={onEdit}
                placeholder={dataKey}
                id={user.id}
                error={errors?.includes(dataKey)}
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
