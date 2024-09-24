import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const productosIniciales = [
  { nombre: "PAQUETES DE SEMOLA", cantidad: 3 },
  { nombre: "PAQUETES DE MAICENA", cantidad: 3 },
  { nombre: "PAQUETES DE CARNE SOYA", cantidad: 3 },
  { nombre: "PAQUETES DE TALLARINES", cantidad: 3 },
  { nombre: "TARROS DE JUREL", cantidad: 3 },
  { nombre: "LITROS DE ACEITE", cantidad: 3 },
  { nombre: "LITROS DE JABON LIQUIDO", cantidad: 3 },
  { nombre: "COLONIAS INGLESAS", cantidad: 3 },
  { nombre: "DESODORANTE EN ESPRAY DE HOMBRE Y MUJER", cantidad: 3 },
  { nombre: "LITROS DE SHAMPOO", cantidad: 3 },
  { nombre: "PAÑALES DE ADULTO TALLA XG", cantidad: 3 },
];

const familias = [
  "Aguirre Rozas", "Alvarado Canales", "Araos Veloso", "Araya Guzmán",
"Arriagada Menares", "Astudillo Vergara", "Basso Caamaño", "Bedoya Andrada",
"Carcay Vergara", "Cisternas Aravena", "Córdova Rivera", "Duarte Noziglia",
"Flores Callisto", "Fuentes Grimaldi", "Herrera Jara", "Lagos Ovando",
"Leiva Pais", "Luengo Vivanco", "Martís Riquelme", "Molina Parra",
"Núñez Zamora", "Pastor Ortega", "Pérez Araya", "Pino Cornejo",
"Ramos Segovia", "Reyes Meneses", "Rissetto Apiolaza", "Saavedra Grez",
"Salazar Andrada", "Salinas González", "Sánchez Díaz", "Torres Castro",
"Valencia Castro", "Vega Valenzuela", "Vittone Gajardo", "Yaser Tejeda
];

const CampañaSolidariaB4A = () => {
  const [almacen, setAlmacen] = useState(productosIniciales);
  const [carro, setCarro] = useState([]);
  const [bodega, setBodega] = useState({});
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState('');

  const totalProductos = productosIniciales.reduce((sum, producto) => sum + producto.cantidad, 0);
  const productosComprometidos = totalProductos - almacen.reduce((sum, producto) => sum + producto.cantidad, 0);
  const porcentajeProductos = (productosComprometidos / totalProductos) * 100;

  const familiasComprometidas = Object.keys(bodega).length;
  const porcentajeFamilias = (familiasComprometidas / familias.length) * 100;

  const moverAlCarro = (producto) => {
    if (producto.cantidad > 0) {
      setAlmacen(almacen.map(p => 
        p.nombre === producto.nombre ? {...p, cantidad: p.cantidad - 1} : p
      ));
      setCarro([...carro, producto.nombre]);
    }
  };

  const confirmarCooperacion = () => {
    if (familiaSeleccionada && carro.length > 0) {
      setBodega({
        ...bodega,
        [familiaSeleccionada]: [...(bodega[familiaSeleccionada] || []), ...carro]
      });
      setCarro([]);
      setFamiliaSeleccionada('');
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen font-sans text-sm">
      <h1 className="text-xl font-light text-center mb-6">Campaña Solidaria B4A</h1>
      
      <div className="mb-6 space-y-2">
        <div className="flex justify-between text-xs mb-1">
          <span>Productos Comprometidos</span>
          <span>{porcentajeProductos.toFixed(1)}%</span>
        </div>
        <Progress value={porcentajeProductos} className="h-2" />
        
        <div className="flex justify-between text-xs mb-1">
          <span>Familias Comprometidas</span>
          <span>{porcentajeFamilias.toFixed(1)}%</span>
        </div>
        <Progress value={porcentajeFamilias} className="h-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 shadow-sm">
          <CardHeader className="text-sm font-medium">ALMACÉN</CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {almacen.map((producto) => (
                <Button
                  key={producto.nombre}
                  onClick={() => moverAlCarro(producto)}
                  disabled={producto.cantidad === 0}
                  className={`h-16 text-xs font-normal ${
                    producto.cantidad === 0 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {producto.nombre}
                  <br />
                  {producto.cantidad === 0 ? 'SIN STOCK' : `DISPONIBLE ${producto.cantidad}`}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 shadow-sm">
          <CardHeader className="text-sm font-medium">CARRO</CardHeader>
          <CardContent>
            <Select onValueChange={setFamiliaSeleccionada} value={familiaSeleccionada}>
              <SelectTrigger className="mb-2">
                <SelectValue placeholder="Selecciona Familia" />
              </SelectTrigger>
              <SelectContent>
                {familias.map((familia) => (
                  <SelectItem key={familia} value={familia}>{familia}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="my-4 h-32 overflow-y-auto bg-yellow-100 p-2 rounded text-xs">
              {carro.map((item, index) => (
                <div key={index} className="bg-white p-1 mb-1 rounded">{item}</div>
              ))}
            </div>
            <Button 
              onClick={confirmarCooperacion}
              disabled={carro.length === 0 || !familiaSeleccionada}
              className="w-full bg-green-200 text-green-700 hover:bg-green-300"
            >
              CONFIRMA COOPERACIÓN
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-pink-50 shadow-sm">
          <CardHeader className="text-sm font-medium">BODEGA SOLIDARIA</CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {familias.map((familia) => (
                <div key={familia} className={`p-2 rounded text-xs ${
                  bodega[familia] ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  <h3 className="font-medium">{familia}</h3>
                  <p>{bodega[familia] ? bodega[familia].join(', ') : 'VACÍO'}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampañaSolidariaB4A;
