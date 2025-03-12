import * as S from './styles'
import { ReactNode, useState } from 'react';

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
      <S.ButtonMui
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        defaultValue={valueButton}
        value={valueButton}
        onClick={handleClick}
      >
        {children}
      </S.ButtonMui>
      <S.MenuMui
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <S.MenuItemMui onClick={() => handleMenuItemClick('ID ASC')}>ID ASC</S.MenuItemMui>
        <S.MenuItemMui onClick={() => handleMenuItemClick('ID DESC')}>ID DESC</S.MenuItemMui>
        <S.MenuItemMui onClick={() => handleMenuItemClick('A-Z')}>A-Z</S.MenuItemMui>
        <S.MenuItemMui onClick={() => handleMenuItemClick('Z-A')}>Z-A</S.MenuItemMui>
        <S.MenuItemMui onClick={() => handleMenuItemClick('Maior EXP')}>Maior EXP</S.MenuItemMui>
        <S.MenuItemMui onClick={() => handleMenuItemClick('Menor EXP')}>Menor EXP</S.MenuItemMui>
      </S.MenuMui>
    </S.Container>
  );
}