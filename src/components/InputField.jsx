import { styled } from '@mui/material/styles';
import { TextField, Autocomplete } from '@mui/material';

const StyledTextField = styled(TextField)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
  width: 'max-content',
  marginRight: '10px'
});

const StyledAutoComplete = styled(Autocomplete)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
  width: '210px',
  marginRight: '10px'
});

const InputField = ({ name, value, onChangehandler, error, disabled, placeholder, id, isAutoComplete, options }) => {
  if (isAutoComplete) {
    return (
      <StyledAutoComplete
        value={value}
        options={options}
        onChange={(e, value) => onChangehandler(id, name, value)}
        renderInput={(params) => <TextField {...params} InputLabelProps={{shrink: false, hide: true}}  label={value ? '' : name} />}
        size="small"        
      />
    )
  }

  return (
    <StyledTextField
      name={name}
      value={value}
      onChange={(e) => onChangehandler(id, e.target.name, e.target.value)}
      error={error}
      disabled={disabled}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      fullWidth
      autoComplete="off"
      inputProps={{
        autoComplete: 'off',
      }}
    />
  );
};

// TODO: Implement passed props
InputField.defaultProps = {
  name: 'text_field_name',
  value: '',
  onChangehandler: () => {},
  error: false,
  disabled: false,
  placeholder: '',
};

export default InputField;
