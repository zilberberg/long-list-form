import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';

const IGNORED_DATA_KEYS = ['id'];

const UserRow = ({ user }) => {
  if (!countryOptions.includes(user.country)) {
    return;
  }

  return (
    <Grid container className={styles.userRow} style={{display: "flex", flexDirection: "row"}}>
      {/* Render each user row inputs and trash icon at the end of each row */}
      {
        Object.keys(user).map((dataKey, index) => {
          if (!IGNORED_DATA_KEYS.includes(dataKey)) {
            return (
              <InputField
                key={index}
                name={dataKey}
                value={user[dataKey]}
                onChangehandler={()=>{}}
                placeholder={dataKey}
              />
            )
          }
        })
      }
      <TrashIconButton />
    </Grid>
  );
};

export default UserRow;
