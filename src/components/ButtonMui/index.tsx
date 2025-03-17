import { Menu, MenuItem } from '@mui/material';
import { ReactNode, useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import * as S from './styles'

interface ButtonMuiProps {
  children: ReactNode;
  valueButton: string;
  valueButtonChange: (value: string) => void;
  filterByOrder: (order: string) => void;
  filterByName: (order: string) => void;
  filterByExp: (order: string) => void;
}

export function ButtonMui({
  children,
  valueButton,
  valueButtonChange,
  filterByExp,
  filterByName,
  filterByOrder,
}: ButtonMuiProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { theme } = useContext(ThemeContext)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (value: string) => {
    valueButtonChange(value)
    setAnchorEl(null);

    switch (value) {
      case 'ID ASC':
        filterByOrder('ASC')
        break;
      case 'ID DESC':
        filterByOrder('DESC')
        break;
      case 'A-Z':
        filterByName('ASC')
        break;
      case 'Z-A':
        filterByName('DESC')
        break;
      case 'Maior EXP':
        filterByExp('ASC')
        break;
      case 'Menor EXP':
        filterByExp('DESC')
        break;
      default:
        break;
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <S.Container>
      <S.MenuButton
        $themeMode={theme}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        defaultValue={valueButton}
        value={valueButton}
        onClick={handleClick}
      >
        {children}
      </S.MenuButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('ID ASC')}>ID ASC</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('ID DESC')}>ID DESC</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('A-Z')}>A-Z</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Z-A')}>Z-A</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Maior EXP')}>Maior EXP</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Menor EXP')}>Menor EXP</MenuItem>
      </Menu>
    </S.Container>
  );
}