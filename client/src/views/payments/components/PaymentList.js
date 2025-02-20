import React, { useContext } from 'react';
import { PaymentContext } from './PaymentContext';
import { Table, Button, Badge, Container } from 'react-bootstrap';
import { FaPlus, FaEye, FaEdit } from 'react-icons/fa';

import { tournamentFee } from '../data'; 
const PaymentList = ({ onInsert, onView, onEdit }) => { 
  const { payments, setCurrentPayment, teams } = useContext(PaymentContext); 

  return ( 
    <Container className="mt-4"> 
      <h4 className="text-center mb-4">Gestión de Pagos de Torneos</h4> 

      <Table> 
        <thead className="table-responsive text-center"> 
          <tr> 
            <th scope='col'>Equipo</th> 
            <th scope='col'>Delegado</th> 
            <th scope='col'>Monto a Pagar</th> 
            <th scope='col'>Estado</th> 
            <th scope='col'>Acciones</th> 
          </tr> 
        </thead> 
        <tbody className='table-group-divider'> 
          {teams && payments ? ( 
            teams.map((team) => { 
              const payment = payments.find((p) => p.team === team.name); 

              return ( 
                <tr key={team.id} className="text-center"> 
                  <td>{team.name}</td> 
                  <td>{team.delegate}</td> 
                  
                  {/* Monto a Pagar */}
                  <td>{tournamentFee} USD</td> 

                  <td> 
                    <Badge bg={payment?.status === 'Pagado' ? 'success' : 'danger'}> 
                      {payment ? payment.status : 'Pendiente'} 
                    </Badge> 
                  </td> 

                  <td> 
                    {!payment ? ( 
                      <Button variant="success" size="sm" onClick={() => { 
                        setCurrentPayment({ 
                          ...team, amount: 0, amountPaid: 0, currency: 'USD', status: 'Pendiente', history: [] 
                        }); 
                        onInsert(); 
                      }}> 
                        <FaPlus /> Registrar Pago 
                      </Button> 
                    ) : ( 
                      <> 
                        <Button variant="info" size="sm" className="mr-2" onClick={() => { 
                          setCurrentPayment(payment); 
                          onView(); 
                        }}> 
                          <FaEye /> Ver 
                        </Button> 
                        ||
                        <Button variant="warning" size="sm" className='mr-2' onClick={() => { 
                          setCurrentPayment(payment); 
                          onEdit(); 
                        }}> 
                          <FaEdit /> Editar 
                        </Button> 
                      </> 
                    )} 
                  </td> 
                </tr> 
              ); 
            }) 
          ) : ( 
            <tr> 
              <td colSpan="6" className="text-center">Cargando datos...</td> 
            </tr> 
          )} 
        </tbody> 
      </Table> 
    </Container> 
  ); 
}; 

export default PaymentList;
