import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledIconButton = styled(IconButton)({
  color: '#613f3f',
  '&:hover': {
    color: '#ba6767',
  },
});

const TrashIconButton = ({ handleClick, id }) => {
  return (
    <StyledIconButton aria-label="delete" size="large" onClick={handleClick.bind(this, id)}>
      <DeleteIcon fontSize="inherit" />
    </StyledIconButton>
  );
};

export default TrashIconButton;
