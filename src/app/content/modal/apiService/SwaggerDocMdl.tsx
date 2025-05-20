import { Button, Modal } from 'react-bootstrap';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

interface swaggerDocMdlProps {
  show: boolean;
  handleClose: () => void;
  docApiUrl?: string;
}

const SwaggerDocMdl: React.FC<swaggerDocMdlProps> = ({ show, handleClose, docApiUrl }) => {

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Swagger API Documentation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SwaggerUI url={docApiUrl} />
      </Modal.Body>
    </Modal>
  );
};

export default SwaggerDocMdl;
