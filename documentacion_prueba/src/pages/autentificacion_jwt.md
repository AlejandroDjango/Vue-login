# <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>Autenticación con JWT</span>

## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>Qué es un sistema de autenticación con token JWT</span>
<p>Antes de empezar vamos a ver rápidamente que es esto de JWT ya que es el sistema de autenticación que vamos a usar.</p>

<p>JWT es un sistema de autenticación que se basa en el uso de tokens. El mecanismo es el siguiente, el usuario hace login en la página y Angular envía al servidor el nombre de usuario y su contraseña. El servidor comprueba si el usuario existe en la base de datos y si la contraseña es correcta y envía a la página web un token generado específicamente para ese usuario. Ese token está firmado por lo que no se puede modificar. La página web guarda ese token y cuando el usuario accede a otra página o ejecuta una acción en la página que dependa del servidor envía el token almacenado.</p>

<p>En resumidas cuentas, se genera un token en servidor, la página se lo guarda en la cookie o en memoria y por cada petición a la API se envía el token para que el servidor compruebe si el usuario tiene permisos. De esta forma se consigue que se puedan proteger llamadas a la API sin necesidad de pasar usuario y contraseña en cada petición (solo se pasa el token).</p>

![El servidor genera el token y la página lo usa en cada petición](img/servidores.jpeg "El servidor genera el token y la página lo usa en cada petición")

## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>

🗺️ Hoja de ruta</span>
<ul>
  <li>Crear y maquetar las vistas de login y registro con formularios</li>
  <li>Conectar el sistema de registro con la API</li>
  <li>Conectar el sistema de login con la API</li>
  <li>Recordar la sesión iniciada al recargar la página</li>
</ul>

## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>Creando las vistas. Formulario de login y registro</span>

<p>Lo primero que vamos a hacer es maquetar los dos formularios, sin lógica por el momento. Para ello vamos a crear dos componentes, uno para la vista de login y otro para la vista del registro.</p>

<p>Ambos componentes los vamos a añadir a las rutas que tengamos en <a href="/vue-router">El router de Vue</a>.</p><p>En mi caso en el fichero <strong>router.js</strong> pongo lo siguiente:</p>
<pre class="language-javascript" data-language="javascript">
<code class="language-javascript" data-language="javascript"><span class="token keyword">
  import</span> Vue <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>
  <span class="token keyword">import</span> Router <span class="token keyword">from</span> <span class="token string">"vue-router"</span><span class="token punctuation">;</span>

  <span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">"./App"</span><span class="token punctuation">;</span>
  <span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">"./views/Home"</span><span class="token punctuation">;</span>
  <span class="token keyword">import</span> Login <span class="token keyword">from</span> <span class="token string">"./views/Login"</span><span class="token punctuation">;</span>
  <span class="token keyword">import</span> Register <span class="token keyword">from</span> <span class="token string">"./views/Register"</span><span class="token punctuation">;</span>

  Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Router<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> Home <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">"/login"</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> Login <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">"/register"</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> Register <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    routes<span class="token punctuation">,</span>

  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre>

<p>Simplemente tres rutas, la de la página principal que próximamente protegeremos para que solo entren usuarios logueados, la del formulario del login y la del registro.</p>

<p>De tal forma que lo que hago es crear 3 archivos en la carpeta <strong>views</strong>: Home.vue, Login.vue y Register.vue</p>

<p>La vista de login (login.vue), la he maquetado de la siguiente forma:</p>

<pre class="language-vue" data-language="vue">

<code class="language-vue" data-language="vue">
  &lt;template&gt;
    &lt;div class="login"&gt;
      &lt;h1 class="title"&gt;Login in the page&lt;/h1&gt;
      &lt;form action class="form"&gt;
        &lt;label class="form-label" for="#email"&gt;Email:&lt;/label&gt;
        &lt;input
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
        /&gt;
        &lt;label class="form-label" for="#password"&gt;Password:&lt;/label&gt;
        &lt;input
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        /&gt;
        &lt;input class="form-submit" type="submit" value="Login" /&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  &lt;/template&gt;

  &lt;script&gt;
  export default {};
  &lt;/script&gt;

  &lt;style lang="scss" scoped&gt;
  .login {
    padding: 2rem;
  }
  .title {
    text-align: center;
  }
  .form {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    min-width: 350px;
    max-width: 100%;
    background: rgba(19, 35, 47, 0.9);
    border-radius: 5px;
    padding: 40px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  }
  .form-label {
    margin-top: 2rem;
    color: white;
    margin-bottom: 0.5rem;
    &amp;:first-of-type {
      margin-top: 0rem;
    }
  }
  .form-input {
    padding: 10px 15px;
    background: none;
    background-image: none;
    border: 1px solid white;
    color: white;
    &amp;:focus {
      outline: 0;
      border-color: #1ab188;
    }
  }
  .form-submit {
    background: #1ab188;
    border: none;
    color: white;
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: background 0.2s;
    &amp;:hover {
      background: #0b9185;
    }
  }
  &lt;/style&gt;

</code></pre>

<p>Lo único que tiene es el formulario de login con unos estilos que me he inventado, de momento no hay nada de lógica en este componente. Siempre recordad de poner los estilos con <strong>scoped</strong> para que se queden aislados del resto de componentes.</p>

![En la imagen se ve un formulario con dos inputs, uno para el email y otro para la contraseña. Además hay un botón de enviar](img/loginPage.jpeg "En la imagen se ve un formulario con dos inputs, uno para el email y otro para la contraseña. Además hay un botón de enviar")

<p>Ahora vamos a añadir los <strong>v-model</strong> en los campos para poder sacar el email y la contraseña que el usuario escribe, para ello:</p>
<pre class="language-vue" data-language="vue">
<code class="language-vue" data-language="vue">
  &lt;template&gt;
    &lt;div class="login"&gt;
      &lt;h1 class="title"&gt;Login in the page&lt;/h1&gt;
      &lt;form action class="form"&gt;
        &lt;label class="form-label" for="#email"&gt;Email:&lt;/label&gt;
        &lt;input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
        /&gt;
        &lt;label class="form-label" for="#password"&gt;Password:&lt;/label&gt;
        &lt;input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        /&gt;
        &lt;input class="form-submit" type="submit" value="Login" /&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  &lt;/template&gt;

  &lt;script&gt;
  export default {
    data: () =&gt; ({
      email: "",
      password: "",
    }),
  };
  &lt;/script&gt;

</code></pre>

<p>No tiene más, dos <strong>v-model</strong> apuntando a variables definidas en la sección data del componente para poder recibir los dos valores. Toca preparar el método para enviar la petición de login:</p>

<pre class="language-vue" data-language="vue">
<code class="language-vue" data-language="vue">
  &lt;template&gt;
    &lt;div class="login"&gt;
      &lt;h1 class="title"&gt;Login in the page&lt;/h1&gt;
      &lt;form action class="form" @submit.prevent="login"&gt;
        &lt;label class="form-label" for="#email"&gt;Email:&lt;/label&gt;
        &lt;input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
        /&gt;
        &lt;label class="form-label" for="#password"&gt;Password:&lt;/label&gt;
        &lt;input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        /&gt;
        &lt;input class="form-submit" type="submit" value="Login" /&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  &lt;/template&gt;

  &lt;script&gt;
  export default {
    data: () =&gt; ({
      email: "",
      password: "",
    }),
    methods: {
      login() {
        console.log(this.email);
        console.log(this.password);
      },
    },
  };
  &lt;/script&gt;

</code></pre>

<p>De momento solo se escriben los dos valores por <strong>consola</strong> para probar que se guardan bien en las variables los valores. Nada muy complicado de momento. Vamos a maquetar por último el mensaje de error con un <strong>v-if</strong> para que se muestre si el usuario ha metido mal el email o la contraseña:</p>
<pre class="language-vue" data-language="vue">
<code class="language-vue" data-language="vue">
  &lt;template&gt;
    &lt;div class="login"&gt;
      &lt;h1 class="title"&gt;Login in the page&lt;/h1&gt;
      &lt;form action class="form" @submit.prevent="login"&gt;
        &lt;label class="form-label" for="#email"&gt;Email:&lt;/label&gt;
        &lt;input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
        /&gt;
        &lt;label class="form-label" for="#password"&gt;Password:&lt;/label&gt;
        &lt;input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        /&gt;
        &lt;p v-if="error" class="error"&gt;
          Has introducido mal el email o la contraseña.
        &lt;/p&gt;
        &lt;input class="form-submit" type="submit" value="Login" /&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  &lt;/template&gt;

  &lt;script&gt;
  export default {
    data: () =&gt; ({
      email: "",
      password: "",
      error: false,
    }),
    methods: {
      login() {
        console.log(this.email);
        console.log(this.password);
      },
    },
  };
  &lt;/script&gt;

</code></pre>

<p>Listo, componente maquetado por el momento, vamos a maquetar el del formulario de registro para prepararlos para conectar al backend.</p>
<p>El componente del registro es <strong>igual</strong> solo que añadiendo un campo nuevo para que el usuario repita su contraseña:</p>
<pre class="language-vue" data-language="vue">
<code class="language-vue" data-language="vue">
  &lt;template&gt;
    &lt;div class="register"&gt;
      &lt;h1 class="title"&gt;Sign Up&lt;/h1&gt;
      &lt;form action class="form" @submit.prevent="register"&gt;
        &lt;label class="form-label" for="#email"&gt;Email:&lt;/label&gt;
        &lt;input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
        /&gt;
        &lt;label class="form-label" for="#password"&gt;Password:&lt;/label&gt;
        &lt;input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        /&gt;
        &lt;label class="form-label" for="#password-repeat"
          &gt;Repite la contraeña:&lt;/label
        &gt;
        &lt;input
          v-model="passwordRepeat"
          class="form-input"
          type="password"
          id="password-repeat"
          placeholder="Password"
        /&gt;
        &lt;input class="form-submit" type="submit" value="Sign Up" /&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  &lt;/template&gt;

  &lt;script&gt;
  export default {
    data: () =&gt; ({
      email: "",
      password: "",
      passwordRepeat: "",
    }),
    methods: {
      register() {
        console.log(this.email);
        console.log(this.password);
        console.log(this.passwordRepeat);
      },
    },
  };
  &lt;/script&gt;

  &lt;style lang="scss" scoped&gt;
  .register {
    padding: 2rem;
  }
  .title {
    text-align: center;
  }
  .form {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    min-width: 350px;
    max-width: 100%;
    background: rgba(19, 35, 47, 0.9);
    border-radius: 5px;
    padding: 40px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  }
  .form-label {
    margin-top: 2rem;
    color: white;
    margin-bottom: 0.5rem;
    &amp;:first-of-type {
      margin-top: 0rem;
    }
  }
  .form-input {
    padding: 10px 15px;
    background: none;
    background-image: none;
    border: 1px solid white;
    color: white;
    &amp;:focus {
      outline: 0;
      border-color: #1ab188;
    }
  }
  .form-submit {
    background: #1ab188;
    border: none;
    color: white;
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: background 0.2s;
    &amp;:hover {
      background: #0b9185;
    }
  }
  .error {
    margin: 1rem 0 0;
    color: #ff4a96;
  }
  &lt;/style&gt;

</code></pre>

![En la imagen se ve un formulario con tres inputs, uno para el email, otro para la contraseña y el último de repetir la contraseña. Además hay un botón de enviar](img/signUp.jpeg "En la imagen se ve un formulario con tres inputs, uno para el email, otro para la contraseña y el último de repetir la contraseña. Además hay un botón de enviar")

<p>🎉 Pues listo, primera tarea completada, hacemos commit y pasamos a la siguiente.</p>

<p><strong>✅ Crear y maquetar las vistas de login y registro con formularios</strong></p>

## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>Conectando el registro al servidor</span>

<p>Lógicamente para poder conectar el login y registro necesitamos un servidor (encargado de almacenar los usuarios en base de datos ya que desde javascript no se puede). Para ello necesitas una API, puedes crear tú mismo una API usando alguna tecnología de backend como nodejs, java o python. Como de lo que se trata es de aprender, para este ejemplo voy a usar esta <strong>API de pruebas</strong> ya creada que tú también puedes usar.</p>

<p>La API en cuestión es la de: <a href="https://reqres.in/" target="_blank" rel="noopener">https://reqres.in/</a>. Te permite mandar peticions de login y registro además de muchas otras para hacer pruebas.</p>

<p>Lo primero que vamos a hacer es conectar el registro, para ello voy a crear una carpeta llamada <strong>logic</strong> dentro de la carpeta <strong>src</strong> del proyecto. Yo la he llamado logic pero la puedes llamar como quieras. Dentro de esa carpeta voy a crear un archivo llamado <strong>auth.js</strong> en el que voy a colocar la petición de registro y la de login.</p>

<p>Por el momento dentro del archivo de <strong>auth.js</strong> voy a crear esto:</p>
<pre class="language-javascript" data-language="javascript">
<code class="language-javascript" data-language="javascript">
  <span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">"axios"</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token constant">ENDPOINT_PATH</span> <span class="token operator">=</span> <span class="token string">"https://reqres.in/api/"</span><span class="token punctuation">;</span>

  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">register</span><span class="token punctuation">(</span><span class="token parameter">email<span class="token punctuation">,</span> password</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span> email<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token constant">ENDPOINT_PATH</span> <span class="token operator">+</span> <span class="token string">"regiser"</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre>

<p>Lo primero es importar axios, si no lo tienes instalado en el proyecto ejecuta:</p>
<pre class="language-bash" data-language="bash">
<code class="language-bash" data-language="bash">
  <span class="token function">npm</span> <span class="token function">install</span> axios <span class="token parameter variable">--save</span>
</code></pre>
<p>Lo siguiente que hago es definir una constante para endpoint de la API. Luego exporto un objeto para poder usar desde fuera este fichero con el método de registro de usuarios.</p>

<p>Dentro del método de registro se construye el objeto <strong>user</strong> que se enviará en la petición POST de registro de usuarios. Por último se llama a axios para que haga el POST y devuelva la promesa.</p>

<p>Vamos ahora a usar este fichero desde el componente de registro. Lo primero que se hace es importar el fichero encima del <strong>export default del componente</strong>:</p>

<pre class="language-vue" data-language="vue">
<code class="language-vue" data-language="vue">
// ... import auth from "@/logic/auth"; export default { data: () =&gt; ({ // ...
</code></pre>
<p>¿Recuerdas el métoodo que creaste que simplemente tenía los console.log? Pues hay que cambiar eso por esto otro:</p>
<pre class="language-javascript" data-language="javascript">
<code class="language-javascript" data-language="javascript">
  <span class="token comment">// ...</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      auth<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>email<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>password<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
</code></pre>

<p>Como el método register del archivo <strong>auth</strong> devuelve una promesa lo que hay que hacer es crear a continuación el <strong>then</strong> para capturar la respuesta asíncrona.</p>

<p>Si ejecutas el código y escribes en el formulario el email <strong><a href="mailto:eve.holt@reqres.in" target="_blank" rel="noopener">eve.holt@reqres.in</a></strong> y la contraseña <strong>pistol</strong> y le das a registrar verás que se devuelve la respuesta de la API, en este caso un <strong>201 created</strong>.</p>

<p>La forma de resolver la asincronía con el <strong>then</strong> está bien pero creo que con <strong>async/await</strong> queda todo más claro:</p>
<pre class="language-javascript" data-language="javascript">
<code class="language-javascript" data-language="javascript">
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> auth<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>email<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>password<span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre>
<p>Por último podemos crear una variable en el data para mostrar error si el usuario ha metido mal el usuario y contraseña. Para capturar el error en la petición podemos usar <strong>try/catch.</strong> De paso vamos a poner que si el registro es correcto lleve al usuario a la página de inicio. Veamos como queda todo el componente:</p>
<pre class="language-vue" data-language="vue">
<code class="language-vue" data-language="vue">
  &lt;template&gt;
    &lt;div class="register"&gt;
      &lt;h1 class="title"&gt;Sign Up&lt;/h1&gt;
      &lt;form action class="form" @submit.prevent="register"&gt;
        &lt;label class="form-label" for="#email"&gt;Email:&lt;/label&gt;
        &lt;input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
        /&gt;
        &lt;label class="form-label" for="#password"&gt;Password:&lt;/label&gt;
        &lt;input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        /&gt;
        &lt;label class="form-label" for="#password-repeat"
          &gt;Repite la contraeña:&lt;/label
        &gt;
        &lt;input
          v-model="passwordRepeat"
          class="form-input"
          type="password"
          id="password-repeat"
          placeholder="Password"
        /&gt;
        &lt;input class="form-submit" type="submit" value="Sign Up" /&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  &lt;/template&gt;

  &lt;script&gt;
  import auth from "@/logic/auth";
  export default {
    data: () =&gt; ({
      email: "",
      password: "",
      passwordRepeat: "",
      error: false,
    }),
    methods: {
      async register() {
        try {
          await auth.register(this.email, this.password);
          this.$router.push("/");
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  &lt;/script&gt;

  &lt;style lang="scss" scoped&gt;
  .register {
    padding: 2rem;
  }
  .title {
    text-align: center;
  }
  .form {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    min-width: 350px;
    max-width: 100%;
    background: rgba(19, 35, 47, 0.9);
    border-radius: 5px;
    padding: 40px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  }
  .form-label {
    margin-top: 2rem;
    color: white;
    margin-bottom: 0.5rem;
    &amp;:first-of-type {
      margin-top: 0rem;
    }
  }
  .form-input {
    padding: 10px 15px;
    background: none;
    background-image: none;
    border: 1px solid white;
    color: white;
    &amp;:focus {
      outline: 0;
      border-color: #1ab188;
    }
  }
  .form-submit {
    background: #1ab188;
    border: none;
    color: white;
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: background 0.2s;
    &amp;:hover {
      background: #0b9185;
    }
  }
  .error {
    margin: 1rem 0 0;
    color: #ff4a96;
  }
  &lt;/style&gt;

</code></pre>
<p>Listo, sistema de registro de usuarios terminado, tarea completad, toca hacer commit.</p>

<p><strong>✅ Conectar el sistema de registro con la API</strong></p>

## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>Sistema de login</span>

<p>Una vez tenemos el sistema de registro el de login debería ser más fácil porque básicamente es repetir lo mismo que antes solo que cambiando la ruta del endpoint.</p>

<p>En el fichero de <strong>auth.js</strong> añadimos:</p>

<pre class="language-javascript" data-language="javascript">
<code class="language-javascript" data-language="javascript">
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">"axios"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token constant">ENDPOINT_PATH</span> <span class="token operator">=</span> <span class="token string">"https://reqres.in/api/"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">register</span><span class="token punctuation">(</span><span class="token parameter">email<span class="token punctuation">,</span> password</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span> email<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token constant">ENDPOINT_PATH</span> <span class="token operator">+</span> <span class="token string">"regiser"</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">login</span><span class="token punctuation">(</span><span class="token parameter">email<span class="token punctuation">,</span> password</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span> email<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token constant">ENDPOINT_PATH</span> <span class="token operator">+</span> <span class="token string">"login"</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>

<p>Y en el componente de login llamamos a este fichero de la misma manera que en el registro, solo que cuando haya error activamos la variable <strong>error</strong> a true para que en el formulario se muestre un error avisando de que el email o la contraseña están mal:</p>
<pre class="language-vue" data-language="vue">
<code class="language-vue" data-language="vue">
  &lt;template&gt;
    &lt;div class="login"&gt;
      &lt;h1 class="title"&gt;Login in the page&lt;/h1&gt;
      &lt;form action class="form" @submit.prevent="login"&gt;
        &lt;label class="form-label" for="#email"&gt;Email:&lt;/label&gt;
        &lt;input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
        /&gt;
        &lt;label class="form-label" for="#password"&gt;Password:&lt;/label&gt;
        &lt;input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        /&gt;
        &lt;p v-if="error" class="error"&gt;
          Has introducido mal el email o la contraseña.
        &lt;/p&gt;
        &lt;input class="form-submit" type="submit" value="Login" /&gt;
      &lt;/form&gt;
      &lt;p class="msg"&gt;
        ¿No tienes cuenta?
        &lt;router-link to="/register"&gt;Regístrate&lt;/router-link&gt;
      &lt;/p&gt;
    &lt;/div&gt;
  &lt;/template&gt;

  &lt;script&gt;
  import auth from "@/logic/auth";
  export default {
    data: () =&gt; ({
      email: "",
      password: "",
      error: false,
    }),
    methods: {
      async login() {
        try {
          await auth.login(this.email, this.password);
          this.$router.push("/");
        } catch (error) {
          this.error = true;
        }
      },
    },
  };
  &lt;/script&gt;

  &lt;style lang="scss" scoped&gt;
  .login {
    padding: 2rem;
  }
  .title {
    text-align: center;
  }
  .form {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    min-width: 350px;
    max-width: 100%;
    background: rgba(19, 35, 47, 0.9);
    border-radius: 5px;
    padding: 40px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  }
  .form-label {
    margin-top: 2rem;
    color: white;
    margin-bottom: 0.5rem;
    &amp;:first-of-type {
      margin-top: 0rem;
    }
  }
  .form-input {
    padding: 10px 15px;
    background: none;
    background-image: none;
    border: 1px solid white;
    color: white;
    &amp;:focus {
      outline: 0;
      border-color: #1ab188;
    }
  }
  .form-submit {
    background: #1ab188;
    border: none;
    color: white;
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: background 0.2s;
    &amp;:hover {
      background: #0b9185;
    }
  }
  .error {
    margin: 1rem 0 0;
    color: #ff4a96;
  }
  .msg {
    margin-top: 3rem;
    text-align: center;
  }
  &lt;/style&gt;

</code></pre>

<p>Si abres la página de login y pruebas con el email: <strong><a href="mailto:eve.holt@reqres.in" target="_blank" rel="noopener">eve.holt@reqres.in</a></strong> y la contraseña <strong>cityslicka</strong> te debería llevar a la página principal ya que la llamada al login ha salido bien. Si pones otro email y contraseña te debería salir el mensaje de error en pantalla.</p>

<p>Pues otra tarea terminada. Commit y a por la siguiente:</p>

<p><strong>✅ Conectar el sistema de login con la API</strong></p>

## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>Recordando la sesión iniciada mediante cookie</span>

![cookies.jpeg](img/cookies.jpeg "cookies")

<p>Vamos con una parte fundamental en todo sistema de login, el de guardar el usuario cuando se loguea en una cookie o en el localstorage para que los componentes puedan pintar información del usuario logueado.</p>

<p>Para este ejemplo voy a optar por usar la librería de <a href="%5Bhttps://github.com/js-cookie/js-cookie%5D(https://github.com/js-cookie/js-cookie)">js cookie</a>, para ello lo primero es decargarlo mediante npm:</p>
<pre class="language-bash" data-language="bash">
<code class="language-bash" data-language="bash">
  <span class="token function">npm</span> <span class="token function">install</span> js-cookie <span class="token parameter variable">--save</span>
</code></pre>

<p>Ahora lo que voy a hacer es crear dos métodos más dentro del archivo de <strong>auth.js</strong>. Uno de ellos para guardar el usuario logueado y el otro para recuperarlo desde las cookies.</p>
<pre class="language-javascript" data-language="javascript">
<code class="language-javascript" data-language="javascript">
  <span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">"axios"</span><span class="token punctuation">;</span>
  <span class="token keyword">import</span> Cookies <span class="token keyword">from</span> <span class="token string">"js-cookie"</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token constant">ENDPOINT_PATH</span> <span class="token operator">=</span> <span class="token string">"https://reqres.in/api/"</span><span class="token punctuation">;</span>

  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">setUserLogged</span><span class="token punctuation">(</span><span class="token parameter">userLogged</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Cookies<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"userLogged"</span><span class="token punctuation">,</span> userLogged<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">getUserLogged</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> Cookies<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"userLogged"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">register</span><span class="token punctuation">(</span><span class="token parameter">email<span class="token punctuation">,</span> password</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span> email<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token constant">ENDPOINT_PATH</span> <span class="token operator">+</span> <span class="token string">"regiser"</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">login</span><span class="token punctuation">(</span><span class="token parameter">email<span class="token punctuation">,</span> password</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span> email<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token constant">ENDPOINT_PATH</span> <span class="token operator">+</span> <span class="token string">"login"</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre>

<p>Lo que vamos a hacer ahora en la vista de login es que si la petición de login sale bien tenemos que guardar el usuario en la cookie. El método de login quedaría de esta forma:</p>
<pre class="language-javascript" data-language="javascript">
<code class="language-javascript" data-language="javascript">
  <span class="token operator">...</span>
  <span class="token keyword">async</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">await</span> auth<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>email<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>password<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">email</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>email
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
      auth<span class="token punctuation">.</span><span class="token function">setUserLogged</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>error <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token operator">...</span>

</code></pre>

<p>En el componente de registro podemos hacer lo propio en caso de que queramos que en nuestra aplicación cuando un usuario se registre se autologuee también.</p>

<p>Ahora en la página principal podemos mostrar el usuario logueado, para ello:</p>
<pre class="language-javascript" data-language="javascript">
<code class="language-javascript" data-language="javascript">
  <span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"home"</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>navigation<span class="token operator">/</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>h1<span class="token operator">&gt;</span>Home<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>p v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"userLogged"</span><span class="token operator">&gt;</span>User loggued<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>userLogged<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>

  <span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
  <span class="token keyword">import</span> Navigation <span class="token keyword">from</span> <span class="token string">"../components/Navigation"</span><span class="token punctuation">;</span>
  <span class="token keyword">import</span> auth <span class="token keyword">from</span> <span class="token string">"@/logic/auth"</span><span class="token punctuation">;</span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Home"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">navigation</span><span class="token operator">:</span> Navigation
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">userLogged</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> auth<span class="token punctuation">.</span><span class="token function">getUserLogged</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>

  <span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>style&gt;</span>

</code></pre>

<p>Pues listo, si has hecho login y refrescas la página verás que el usuario logueado sigue estando porque se guarda en las cookies. Para terminar podemos crear en el archivo <strong>auth.js</strong> un método para cerrar sesión que simplemente borre la cookie:</p>
<pre class="language-javascript" data-language="javascript">
<code class="language-javascript" data-language="javascript">
  <span class="token function">deleteUserLogged</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Cookies<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">'userLogged'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

</code></pre>

<p><strong>ATENCIÓN</strong>: No recomiendo guardar toda la información del usuario en la cookie, pero lo hecho así en este ejemplo para demostrar cómo guardar cosas en las cookies. En estos casos lo que se suele hacer es guardar un token y no todo el usuario. Más info de esto si buscas <strong>JWT</strong></p>

<p>Pues la última tarea terminada también. Commit y listo.</p>

<p>La página principal la he dejado sin estilos, pero puedes aprovechar para cambiarlos.</p><p>Te dejo el proyecto subido a <strong>Codesanbox</strong> para que puedas jugar con él:</p>

<p>🖥️ <a href="https://codesandbox.io/s/vue-router-53326" target="_blank" rel="noopener">Proyecto completo en codesanbox</a></p>

<p>Y para terminar te pongo deberes por si quieres seguir aprendiendo:</p>

<ul>
  <li>Mostrar aviso y comprobación en el registro si las dos contraseñas no coinciden</li>
  <li>Deshabilitar el botón con otros estilos mientras que el usuario no meta el email y las contraseñas no coincidan</li>
  <li>Meter más campos en el registro (nombre de usuario por ejemplo) y guardar más información del usuario en las cookies</li>
</ul>

## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>Conclusiones</span>

<p>Como he dicho muchas veces, mira siempre la consola del navegador porque muchas veces falla algo y no nos damos cuenta hasta que leemos el mensaje ahí.</p>

<p>Espero que te haya gustado este ejemplo práctico y espero que te haya servido para afianzar los conocimientos que ya tenías de Vue. Con esto deberías ser capaz de crear cosas bastante interesantes a partir de aquí.</p>

<p>Echa un vistazo a los <a href="/vue-filters">Filtros de Vue</a> y a las <a href="/vue-directives">Directivas de Vue</a> para que todavía le saques mucho más partido a Vue.</p>
