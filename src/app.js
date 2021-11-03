import express, {json} from 'express';
import tipoProductosRoutes from './routes/tipoProductos'
import productosRoutes from './routes/productos'
import clientesRoutes from './routes/clientes'
import FacturasRoutes from './routes/facturas'
import DescuentosRoutes from './routes/descuentos'


const app = express();

app.use(json());


app.use('/api/tipoProductos',tipoProductosRoutes);
app.use('/api/productos',productosRoutes);
app.use('/api/clientes',clientesRoutes);
app.use('/api/facturas',FacturasRoutes);
app.use('/api/descuentos',DescuentosRoutes);


export default app;