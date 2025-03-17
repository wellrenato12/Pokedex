import Modal, { ModalProps } from '@mui/material/Modal';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

export const ModalMuiContainer = styled(Modal)<ModalProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ModalMuiContent = styled(motion.div)`
  background-color: #E5E7EB;
  border-radius: .75rem;
  border: 1rem solid #4B5563;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 36rem;
  width: 24rem;
`

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;

  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    height: 100%;
    object-fit: cover;
  }

  span {
    position: absolute;
    right: 1rem;
    top: 1rem;
    background-color: #374151;
    color: white;
    padding: .5rem 1rem;
    border-radius: 100%;
    font-size: 1.5rem;
  }  
`

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  margin: 1rem;
  width: 100%;

  div:first-child {
    display: flex;
    flex-direction: column;

    span:first-child {
      font-size: 2rem;
      font-weight: 700;
      text-transform: capitalize;
    }

    span:last-child {
      text-align: center;
    }
  }
`

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 1rem;
  }

  div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: .25rem;
    margin-top: .5rem;

    span {
      display: flex;
      gap: .15rem;

      background-color: white;
      padding: 0.25rem .5rem;
      border-radius: 8px;
    }
  }
`

export const HabilidadesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  h2 {
    font-size: 1rem;
  }

  div {
    display: flex;
    gap: 1rem;
    margin-top: .5rem;

    span {
      background-color: white;
      padding: 0.25rem .5rem;
      border-radius: 8px;
    }
  }
`

export const CloseButton = styled(X)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
`