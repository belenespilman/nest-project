---
theme: seriph

background: /assets/pxfuel.jpg

class: 'text-center'

info: |
  ## Calilegua Backend

transition: slide-left
title: Mi primera API en NestJS
mdc: true
---

# Calilegua Backend

<div class=''>
  <p class='text-3xl'>
    ¡Bienvenidos! 
  </p>
</div>
<div class="pt-4">
  <span class='text-2xl' flex="~ justify-center items-center ">
  En esta presentación exploraremos el funcionamiento de nuestra API en NestJS
  
  </span>
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" flex="~ justify-center items-center gap-2" hover="bg-white bg-opacity-10">
  Siguiente
  <div class="i-carbon:arrow-right inline-block"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <div class="i-carbon:edit" />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---

# Introducción: ¿Qué es Nest.JS?

Nest.Js es un framework diseñado para desarrollar aplicaciones desde el lado del servidor.
Algunas de sus principales ventajas son:

- 🗂️ **Arquitectura Modular** - Permite organizar nuestra aplicación en módulos independientes y reutilizables, mejorando su escalabilidad y mantabilidad.

- 📍 **Inyección de Dependencias** - Reduce el acoplamiento entre clases ya que las dependencias no se crean directamente dentro de las mismas.

- 🧑‍💻 **Soporte para Microservicios** - Facilita la creación de sistemas distribuidos donde cada componente puede escalarse de manera independiente.

- ⚙️ **Soporte para Bases de Datos escalables** - Otorga flexibilidad a la hora de elegir la base de datos más adecuada para tu proyecto, dado que posee integraciones con bases de datos relacionales y documentales.

<br>
<br>

Leé más acerca de NestJS en la documentación oficial: [¿Por qué NestJS?](https://nestjs.com/)

<style>
h1 {
  background-color:rgb(89, 194, 232);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# Inyección de Dependencias en NestJS

<br>
<br>

- En NestJS, la inyección de dependencias se maneja mediante el sistema de módulos. Aquí te muestro un ejemplo de cómo se realiza la inyección de dependencias para un servicio.
  <br>
  <br>

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductosService {
  constructor(
    private fabricanteService: FabricantesService,
    @InjectModel(Producto.name) private productModel: Model<Producto>,
  ) {}
}
```

---

# Estructura API Rest en NestJS

## **Decoradores** - Estos son fundamentales en NestJS porque facilitan la creación de componentes estructurados y permiten que el framework gestione dependencias, rutas, validaciones, y más.

- Algunos ejemplos de decoradores en nuestro proyecto:

```ts
@Put('/:idProduct')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Modificar/Actualizar un producto por ID' })
  updateProduct(
    @Param('idProduct', MongoldPipe) idProduct: string,
    @Body() body: UpdateProductDto,
  ): any {
    return this.productosService.updateProduct(idProduct, body);
  }



```

---

# Modularización en Nest, un ejemplo 🖇️

```ts
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Producto.name,
        schema: ProductoSchema,
      },
    ]),

    PassportModule,
    JwtModule,
  ],
  controllers: [
    FabricantesController,
    ProductosController,
    CategoriasController,
  ],
  providers: [ProductosService, CategoriasService, FabricantesService],
  exports: [ProductosService],
})
export class ProductosModule {}
```

---

# Fase 1 - Creación de nuestro proyecto: Módulos, DTOS e implementación de servicios

- En la fase inicial de nuestro proyecto creamos los módulos de productos y de operadores con el cliente de Nest.Luego agregamos los DTOS correspondientes para cada entidad e implementamos la lógica de negocio en nuestros servicios:

### Ejemplo de nuestro módulo de operadores:

```ts {*}{maxHeight:'300px'}
@Module({
  imports: [ProductosModule, PassportModule],
  controllers: [
    CompradoresController,
    PedidosController,
    OperadoresController,
    DetallePedidoController,
  ],
  providers: [
    PedidosService,
    CompradoresService,
    OperadoresService,
    DetallePedidoService,
  ],

  exports: [OperadoresService],
})
export class OperadoresModule {}
```

---

### Ejemplo de Data Transfer Object (DTO) con class-validator

```ts {*}{maxHeight:'500px'}
import {
  IsString,
  IsNumber,
  IsPositive,
  Min,
  IsNotEmpty,
  ValidateIf,
  IsOptional,
  ValidateNested,,
  IsMongoId,
} from 'class-validator';
import { CreateCategoryDTO } from './categorias.dto';

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({ description: 'Descripción del producto' })
  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly precio: number;

  @ApiProperty({ description: 'Stock del producto' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty({ description: 'Origen del producto' })
  @IsString()
  @IsNotEmpty()
  readonly origen: string;

  @ApiProperty({ description: 'Imagen del producto' })
  @IsNotEmpty()
  readonly imagen: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  readonly categoria: CreateCategoryDTO;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly fabricante: string;
}
```

<br>

---

### Implementación de logica de negocios en los servicios:

- Ejemplo del servicio de productos

```ts {*}{maxHeight:'500px'}
@Injectable()
export class ProductosService {
  constructor(
    private fabricanteService: FabricantesService,
    @InjectModel(Producto.name) private productModel: Model<Producto>,
  ) {}

  async findAll(params?: FilterProductDto) {
    if (params) {
      const filters: FilterQuery<Producto> = {};
      const { precioMinimo, precioMaximo } = params;
      const { limit, offset } = params;
      if (precioMinimo && precioMaximo) {
        filters.precio = { $gte: precioMinimo, $lte: precioMaximo };
      }
      return this.productModel.find(filters).skip(offset).limit(limit).exec();
    }
    return this.productModel.find().populate('fabricante').exec();
  }

  async findOne(id: string): Promise<Producto> {
    const producto = await this.productModel.findById(id).exec();
    if (!producto) {
      throw new NotFoundException(`El producto con id: ${id} no existe`);
    }
    return producto;
  }

  async createProduct(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return await newProduct.save();
  }

  async updateProduct(id: string, changes: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with #id ${id} no encontrado`);
    }
    return product;
  }

  async deleteProducto(id: string): Promise<Object> {
    const producto = await this.productModel.findByIdAndDelete(id).exec();

    if (!producto) {
      throw new NotFoundException(`El producto con id: ${id} no se encuentra`);
    }
    return {
      success: true,
      message: 'Producto eliminado correctamente',
    };
  }
```

<br>

---

# Configuración de variables de entorno

Ya iniciado nuestro proyecto, avanzamos en la configuración de variables de ambiente. Las mismas nos permiten que la información sensible esté protegida y accesible solo a los procesos que la necesiten.

Para configurar estas variables utilizamos la libreria nest/config. Cargamos las variables en un archivo .env para acceder a ellas en cualquier parte de la aplicación de manera estructurada. Además lo integramos con la librería Joi para validar su tipo.

### Ejemplo en el módulo de la APP

```ts {*}{maxHeight:'300px'}
@Global()
@Module({
  imports: [
    HttpModule,
    OperadoresModule,
    ProductosModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        APIKEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),]
})
```

<br>

---

# Documentando nuestro proyecto con Swagger

Documentar nuestra API es importante para brindar una presentación clara de la estructura, funcionalidades y endpoints de nuestra aplicación al momento de ser utilizada.
<br>
Eso lo logramos trabajando con Swagger, que ofrece una interfaz intuitiva y ordenada para mostrar cómo funciona nuestra aplicación.

### Ejemplo de un controlador documentado con Swagger

```ts {*}{maxHeight:'400px'}
@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  constructor(private compradoresService: CompradoresService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de todos los compradores' })
  @HttpCode(HttpStatus.ACCEPTED)
  getAllCompradores(): any {
    return this.compradoresService.findAll();
  }

  @Get('/:idComprador')
  @ApiOperation({ summary: 'Obtener comprador por ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  getCompradorbyId(
    @Param('idComprador', MongoldPipe) idComprador: string,
  ): any {
    {
      return this.compradoresService.findOne(idComprador);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Crear Comprador' })
  createComprador(@Body() payload: CreateCompradorDTO): any {
    return this.compradoresService.createComprador(payload);
  }
```

---

# Fase 2 - Conexión a Base de Datos (PostgeSQL + PGAdmin)

En esta etapa avanzamos creando y conectándonos a una base de datos relacional. Este fue un proceso complejo que requirió implementar diferentes tecnologías como Docker y TypeORM

#### Durante esta etapa añadimos nuestras 6 entidades configuradas con TypeORM y generamos relaciones entre ellas que se plasmaron en nuestra base de datos:

<br>

#### Ejemplo de la entidad de producto configurada con TypeORM (Incluye relaciones muchos a uno y muchos a muchos)

```ts {*}{maxHeight:'200px'}
@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Index()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  precio: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  origen: string;

  @Column({ type: 'varchar' })
  imagen: string;

  @ManyToOne(() => Fabricante, (fabricante) => fabricante.products) // Muchos productos se relacionan con un fabricante
  @JoinColumn({ name: 'brand_id' })
  fabricante: Fabricante;

  @ManyToMany(() => Categoria, (categoria) => categoria.productos) //Muchos productos se relacionan con muchas categorías
  categorias: Categoria[];
}
```

---

# Migrando a MongoDB

Para profundizar en el manejo de bases de datos realizamos una migración a una base de datos documental (no relacional) como MongoDB.

#### Este proceso implicó realizar modificaciones en nuestro código para implementar nuevos servicios como "mongoose" y adecuar nuestras entidades a esta nueva base de datos.

#### Así, actualizamos nuestras entidades a la nueva forma:

```ts {*}{maxHeight:'300px'}
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Fabricante } from './fabricante.entity';
import { Types } from 'mongoose';
import { Categoria, SubDocCategoria } from './categoria.entity';

@Schema()
export class Producto {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ type: String })
  descripcion: string;

  @Prop({ type: Number, index: true })
  precio: number;

  @Prop({ type: Number })
  stock: number;

  @Prop({ type: String })
  origen: string;

  @Prop({ type: String })
  imagen: string;

  @Prop(
    raw({
      type: { SubDocCategoria },
    }),
  )
  categoria: Categoria;

  @Prop({ type: Types.ObjectId, ref: Fabricante.name })
  fabricante: Fabricante | Types.ObjectId;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
```

---

# Fase 3 - Seguridad: Protección con Guardianes y Autenticación con PassportJS

En esta etapa de nuestro proyecto implementamos algunas medidas de seguridad en nuestra aplicación. Una de ellas es la creación de **Guards** que nos permiten:

📝 Verificar si un usuario está autenticado. <br>
📝 Comprobar si un usuario tiene los permisos necesarios para acceder a un recurso. <br>
📝 Realizar otras verificaciones personalizadas antes de permitir el acceso a la ruta.<br>

#### Luego creamos un nuevo módulo para implementar la lógica de autenticación/autorización y lo exportamos para que esté disponible en el resto de nuestra aplicación.

```ts {*}{maxHeight:'200px'}
@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
  imports: [
    OperadoresModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
```

---

# Autenticación con PassportJS - Local Strategy

Creamos un login utilizando la lógica de Passport Strategy en nuestro servicio de autenticación:

<br>
<br>
<div class=''>
<img src='/assets/login.png' alt="Descripción de la imagen" width="500" class='w-full h-full object-cover' />
</div>

---

# Seguridad: Guardianes con JSON Web Token

En nuestra API utilizamos JSON Web Tokens (JWT) para manejar la autenticación y la autorización de manera eficiente y segura.

##### ¿Cómo lo implementamos?

🛂**Autenticación:** Al iniciar sesión, el servidor genera un token JWT firmado que contiene información básica del usuario (ID, roles). Este token se envía al cliente y se almacena en el navegador o la aplicación cliente.
<br>
<br>
🔐 De esta lógica se encarga el login con **PassportJS** y los **Guards**

🛃**Autorización:** Cada solicitud al servidor incluye el token en el encabezado. El servidor verifica el token y, según la información contenida, determina si el usuario tiene acceso al recurso solicitado.
<br>
<br>
🔑 Para las autorizaciones implementamos la autorización basada en **roles** (comprador, operador, administrador)

---

# Fase 4: 🧪 Testing en NestJS

### ¿Por qué es importante el testing?

<br>
<br>

✅**Calidad**: Asegura que nuestra aplicación funciona correctamente. <br>
✅**Confianza**: Reduce errores al implementar nuevas características. <br>
♻️**Mantenimiento**: Facilita cambios futuros en el código. <br>

<br>

### Herramientas comunes en NestJS para testing 🛠️

<br>

- **Jest**: Framework de testing integrado.
- Simple, poderoso y rápido.
- Compatible con TypeScript.

---

# Ejemplo básico de un test unitario 🧩

```ts{*}{maxHeight:'420px'}
describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      generateJWT: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.generateJWT when login is invoked', async () => {
    const operador = mock<Operador>();
    operador.id = 1;
    operador.email = 'test@example.com';
    operador.password = 'hashedPassword';
    operador.role = 'admin';

    const req = { user: operador } as any;

    const mockResponse = {
      access_token: 'mockToken',
      operador,
    };

    jest.spyOn(authService, 'generateJWT').mockResolvedValueOnce(mockResponse);

    const result = await controller.login(req);

    expect(authService.generateJWT).toHaveBeenCalledWith(operador);

    expect(result).toEqual(mockResponse);
  });
});
```
