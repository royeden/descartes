/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";

import { Layout } from "~components/Layout";

export default function Investigacion(): JSX.Element {
  return (
    <Layout
      className="flex flex-col w-full max-h-screen overflow-hidden"
      footer={false}
      seo={{
        description: "Donde explorar la basura digital que se va quemando",
        title: "Ver basura arder",
      }}
    >
      <style jsx>{`
        .rb-text-shadow {
          text-shadow: rgb(0, 255, 255) -1.36153px 1.40991px 0px,
            rgb(255, 0, 255) 1.36153px -1.40991px 0px;
        }
        .gray-text-shadow {
          text-shadow: rgb(166, 166, 166, 40%) 2.76111px 5.92121px 1.86667px;
        }
      `}</style>
      <article className="flex justify-center overflow-y-auto text-white scrollbar-thin scrollbar-thumb-fuchsia-500">
        <div className="max-w-5xl">
          <section className="flex flex-col items-center justify-center min-h-screen px-4 space-y-4 lg:space-y-10">
            <h1 className="space-y-4 text-4xl font-bold text-center sm:text-6xl md:text-7xl lg:space-y-10 lg:tracking-wider lg:text-8xl rb-text-shadow font-montserrat">
              <span className="block">DESCARTES</span>
              <span className="block">BASURA DIGITAL</span>
            </h1>
            <p className="text-lg text-center lg:max-w-5xl sm:text-3xl md:text-3xl lg:text-5xl font-montserrat">
              ¿Qué pasa con las imágenes que son descartadas?
            </p>
          </section>
          <section className="flex flex-col justify-around min-h-screen italic font-bold font-rubik">
            <div className="w-11/12 px-8 py-4 bg-black bg-opacity-50 xl:w-3/5">
              <p>
                Me encuentro ahora mismo revisando muchísimas fotos viejas, las
                cuales tengo guardadas en diversos lugares y son, en su mayoría,
                digitales. Cada vez que tengo que &quot;hacer lugar&quot; para
                cosas nuevas, no sé ni siquiera por dónde empezar:
              </p>
              <p>
                ¿Tengo que borrar? ¿Tengo que elegir? Quiero abstraer un poco
                ese proceso de lo que se va y poner un poco la visión en por qué
                algo &quot;tiene que irse&quot;.
              </p>
            </div>
            <div className="self-end w-11/12 px-8 py-4 bg-black bg-opacity-50 xl:w-3/5">
              <p>
                ¿Cómo nos acercamos a la{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  materialidad
                </span>{" "}
                de las{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  imágenes digitales
                </span>
                ?
              </p>
              <p>
                ¿Qué pasaría si cada{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  intercambio
                </span>{" "}
                que tenemos en este espacio{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  afecta{" "}
                </span>
                un material ajeno?
              </p>
            </div>
          </section>
          <section className="flex flex-col items-center justify-around min-h-screen space-y-4 lg:space-y-10">
            <div className="w-full px-8 py-4 font-bold bg-black bg-opacity-50">
              <h1 className="text-lg font-bold md:text-4xl font-montserrat">
                <span className="block text-purple-500">PROLOGO:</span>
                <span className="block">
                  LAS TECNOLOGÍAS QUE NOS VAN A DESTRUIR.
                </span>
              </h1>
            </div>
            <div className="px-8 py-4 bg-black bg-opacity-50 font-rubik">
              <p className="">
                Desde la aparición del{" "}
                <a
                  href="#1"
                  className="underline transition-colors duration-300 ease-in-out text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                >
                  Paper de Bitcoin en 2009<sup>[1]</sup>
                </a>
                , asociado a la figura desconocida de Satoshi Nakamoto
                (pseudonimo adoptado por quién/es desarrollaron las bases para
                la tecnología) hasta la actualidad, han aparecido muchísimas
                formas nuevas de interactuar con intercambios P2P de información
                digital. Sin embargo, Bitcoin sigue resaltando, no sólo por su
                precio, ni por ser el originen de todas las monedas asociadas a
                las tecnologías de Blockchain, sino por el creciente consumo
                energético que tiene la red descentralizada a lo largo del
                mundo. Se estima que durante 2020,{" "}
                <a
                  href="#2"
                  className="underline transition-colors duration-300 ease-in-out text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                >
                  la red entera de Bitcoin consumió más electricidad que el
                  territorio Argentino<sup>[2]</sup>
                </a>
                , quedando en el puesto 30 de consumo energético global si fuese
                tomado como un país. Blockchain, la tecnología que surge del
                paper de Bitcoin, consiste en generar una creciente cadena de
                bloques enlazados con criptografía donde figura el histórico de
                cada transacción hecha en el sistema. Funciona de manera
                descentralizada y basa los procesamientos de los bloques en un
                algoritmo llamado
                <a
                  href="#3"
                  className="underline transition-colors duration-300 ease-in-out text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                >
                  proof-of-work<sup>[3]</sup>
                </a>{" "}
                (basado en el de{" "}
                <a
                  href="#4"
                  className="underline transition-colors duration-300 ease-in-out text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                >
                  HashCash<sup>[4]</sup>
                </a>
                ), que se utiliza para cifrar cada bloque. Dicho algoritmo
                consiste en resolver un cifrado criptográfico a{" "}
                <a
                  href="#5"
                  className="underline transition-colors duration-300 ease-in-out text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                >
                  fuerza bruta<sup>[5]</sup>
                </a>{" "}
                (prueba y error), el cuál tratan de resolver todxs lxs
                participantes en simultáneo. Resolver dicho algoritmo amerita un
                gasto enorme de energía y también un enorme desperdicio:
                solamente se utiliza el resultado de la primer computadora que
                logra resolver el cifrado, todo lo demás es gasto energético y
                computacional.
              </p>
            </div>
          </section>
          <section className="flex flex-col justify-around min-h-screen">
            <div className="px-8 py-4 bg-black bg-opacity-50">
              <p>
                Pero Bitcoin no es la única tecnología que está incursionando en
                el impacto energético global: El cripto-arte digital también
                comenzó desde{" "}
                <a
                  href="#6"
                  className="underline transition-colors duration-300 ease-in-out text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                >
                  2014<sup>[6]</sup>
                </a>{" "}
                con los{" "}
                <a
                  href="#7"
                  className="underline transition-colors duration-300 ease-in-out text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                >
                  NFTs<sup>[7]</sup>
                </a>{" "}
                (Non-Fungible-Tokens), teniendo también una explosión en su uso
                y popularidad durante los años siguientes. Estos permiten
                generar una escasez digital verificable y, si bien habilitan a
                lxs artistas digitales a generar dinero vendiendo sus obras,{" "}
                <a
                  href="#8"
                  className="underline transition-colors duration-300 ease-in-out text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                >
                  termina en la existencia de un mercado especulativo de sus
                  precios y, debido a esto, un impacto mayor al medio ambiente
                  debido a la cantidad de transacciones y a los algoritmos que
                  se utilizan para validarlas<sup></sup>
                </a>
                .{" "}
                <a
                  href="#9"
                  className="underline transition-colors duration-300 ease-in-out text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                >
                  Ni siquiera las personas responsables de su creación están de
                  acuerdo con su uso actual<sup>[9]</sup>
                </a>
                . Varixs artistas digitales también aportaron sus propias{" "}
                <a
                  href="#10"
                  className="underline transition-colors duration-300 ease-in-out text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                >
                  críticas<sup>[10]</sup>
                </a>{" "}
                y{" "}
                <a
                  href="#11"
                  className="underline transition-colors duration-300 ease-in-out text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                >
                  análisis<sup>[11]</sup>
                </a>
                .
              </p>
              <p>
                El acceso a este tipo de tecnologías es también limitado en
                todos los sentidos: No solamente es necesario el acceso a los
                dispositivos y conocimientos del funcionamiento de ellas, sino
                también es necesario un capital inicial, atado a divisas
                internacionales, que generalmente es cubierto por lxs artistas
                que quieren obtener valor económico de sus obras digitales.
              </p>
            </div>
            <div className="px-8 py-4 bg-black bg-opacity-50">
              <p className="before:block before:h-20 before:-mt-20" id="1">
                [1] Satoshi Nakamoto. (2009). Bitcoin: A Peer-to-Peer Electronic
                Cash System.{" "}
                <a
                  className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  href="https://bitcoin.org/bitcoin.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://bitcoin.org/bitcoin.pdf
                </a>
              </p>
              <p className="before:block before:h-20 before:-mt-20" id="2">
                [2] Criddle, B. C. (2021, 10 febrero). Bitcoin consumes «more
                electricity than Argentina». BBC News.{" "}
                <a
                  className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  href="https://www.bbc.com/news/technology-56012952"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://www.bbc.com/news/technology-56012952
                </a>
              </p>
              <p className="before:block before:h-20 before:-mt-20" id="3">
                [3] Sistema de prueba de trabajo. (2021, 8 enero). En Wikipedia,
                la enciclopedia libre.{" "}
                <a
                  className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  href="https://es.wikipedia.org/wiki/Sistema_de_prueba_de_trabajo"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://es.wikipedia.org/wiki/Sistema_de_prueba_de_trabajo
                </a>
              </p>
              <p className="before:block before:h-20 before:-mt-20" id="4">
                [4] Back, A. (2002, agosto). Hashcash - A Denial of Service
                Counter-Measure.{" "}
                <a
                  className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  href="http://hashcash.org/papers/hashcash.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  http://hashcash.org/papers/hashcash.pdf
                </a>
              </p>
              <p className="before:block before:h-20 before:-mt-20" id="5">
                [5] Ataque de fuerza bruta. (2020, 28 septiembre). En Wikipedia,
                la enciclopedia libre.{" "}
                <a
                  className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  href="https://es.wikipedia.org/wiki/Ataque_de_fuerza_bruta"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://es.wikipedia.org/wiki/Ataque_de_fuerza_bruta
                </a>
              </p>
              <p className="before:block before:h-20 before:-mt-20" id="6">
                [6] Rhizome. (2014, 22 mayo). Seven on Seven 2014: Kevin McCoy &
                Anil Dash [Vídeo]. Vimeo.{" "}
                <a
                  className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  href="https://vimeo.com/96131398"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://vimeo.com/96131398
                </a>
              </p>
              <p className="before:block before:h-20 before:-mt-20" id="7">
                [7] Token no fungible. (2021, 15 junio). En Wikipedia, la
                enciclopedia libre.{" "}
                <a
                  className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  href="https://es.wikipedia.org/wiki/Token_no_fungible"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://es.wikipedia.org/wiki/Token_no_fungible
                </a>
              </p>
              <p className="before:block before:h-20 before:-mt-20" id="8">
                [8] Pipkin, E. (2021, 14 marzo). &quot;THE ENVIRONMENTAL ISSUES
                WITH CRYPTOART WILL BE SOLVED SOON, RIGHT?&quot;. Medium.{" "}
                <a
                  className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  href="https://everestpipkin.medium.com/but-the-environmental-issues-with-cryptoart-1128ef72e6a3"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://everestpipkin.medium.com/but-the-environmental-issues-with-cryptoart-1128ef72e6a3
                </a>
              </p>
              <p className="before:block before:h-20 before:-mt-20" id="9">
                [9] Dash, A. (2021, 2 abril). NFTs Weren’t Supposed to End Like
                This. The Atlantic.{" "}
                <a
                  className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  href="https://www.theatlantic.com/ideas/archive/2021/04/nfts-werent-supposed-end-like/618488/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://www.theatlantic.com/ideas/archive/2021/04/nfts-werent-supposed-end-like/618488/
                </a>
              </p>
              <p className="before:block before:h-20 before:-mt-20" id="10">
                [10] Akten, M. (2021b, abril 27). The Unreasonable Ecological
                Cost of #CryptoArt. Part 1. Medium.{" "}
                <a
                  className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  href="https://memoakten.medium.com/the-unreasonable-ecological-cost-of-cryptoart-2221d3eb2053"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://memoakten.medium.com/the-unreasonable-ecological-cost-of-cryptoart-2221d3eb2053
                </a>
              </p>
              <p className="before:block before:h-20 before:-mt-20" id="11">
                [11] Estorick, A. (2021, 27 febrero). Episode V. Toward a New
                Ecology of Crypto Art: A Hybrid Manifesto | |. Flash Art.{" "}
                <a
                  className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  href="https://flash---art.com/2021/02/episode-v-towards-a-new-ecology-of-crypto-art/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  https://flash---art.com/2021/02/episode-v-towards-a-new-ecology-of-crypto-art/
                </a>
              </p>
            </div>
          </section>
          <section className="flex flex-col justify-around min-h-screen">
            <div className="w-full px-8 py-4 font-bold bg-black bg-opacity-50">
              <h1 className="text-lg font-bold md:text-4xl font-montserrat">
                <span className="block text-purple-500">
                  UN ARCHIVO SENSIBLE:
                </span>
                <span className="block">
                  ¿DÓNDE SE ENCUENTRA LA SENSIBILIDAD DE LAS IMÁGENES?
                </span>
              </h1>
            </div>
            <div className="w-11/12 px-8 py-4 bg-black bg-opacity-50 xl:w-3/5">
              <p className="italic font-bold font-montserrat">
                &quot;La imagen pobre es una copia en movimiento, tiene mala
                calidad y resolución subestandar. Se deteriora al acelerarla. Es
                el fantasma de una imagen, una miniatura, una idea errante en
                distribución gratuita, viajando a presión en lentas conexiones
                digitales, comprimida, reproducida, ripeada, remezclada, copiada
                y pegada en otros canales de distribución&quot; (H. Steyerl,
                &quot;En defensa de la imagen pobre.&quot; , 2009).
              </p>
            </div>
            <div className="self-end w-11/12 px-8 py-4 bg-black bg-opacity-50 xl:w-3/5">
              <p className="italic font-bold font-montserrat">
                &quot;(...); esta palabra me iría tanto mejor cuanto que remite
                también a la idea de puntuación y que las fotos de que hablo
                están en efecto como puntuadas, a veces incluso moteadas par
                estos puntas sensibles; precisamente esas marcas, esas heridas,
                son puntas. Ese segundo elemento que viene a perturbar el
                studium lo llamare punctum; pues punctum es también: pinchazo,
                agujerito, pequeña mancha, pequeño corte, y también casualidad.
                EI punctum de una foto es ese azar que en ella me despunta (pero
                que también me lastima, me punza).&quot; Barthes, R. (Ed.).
                (1990). Studium y Punctum. En La cámara lúcida (p. 65). Paidós
                Comunicación.
              </p>
            </div>
          </section>
          <section className="flex flex-col justify-around min-h-screen">
            <div className="w-full px-8 py-4 font-bold bg-black bg-opacity-50">
              <h1 className="text-lg font-bold md:text-4xl font-montserrat">
                <span className="block text-purple-500">
                  UNA MATERIALIDAD SENSIBLE:
                </span>
                <span className="block">
                  ¿CÓMO INTERCAMBIAR IMÁGENES DIGITALES PERCIBIENDO SU
                  MATERIALIDAD?
                </span>
              </h1>
            </div>
            <div className="px-8 py-4 bg-black bg-opacity-50 font-rubik">
              <p>
                El{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  espacio virtual
                </span>{" "}
                parece{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  infinito
                </span>
                . Sin embargo, todo archivo virtual ocupa un{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  espacio de almacenamiento
                </span>{" "}
                en un disco: ¿Cómo influye en el intercambio de imágenes el
                espacio que ocupan? ¿De qué manera se puede{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  articular la materialidad con la información sensible de la
                  imagen
                </span>
                ? ¿Separar la información sensible de la información visual es
                posible? ¿Qué se pierde al &quot;
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  degradarse
                </span>
                &quot; la imagen? ¿Que pasaría ante un espacio donde estas
                características están atadas a la posibilidad del{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  intercambio de imágenes
                </span>{" "}
                para la{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  generación de un archivo colectivo
                </span>
                ? ¿Qué pasa si de las lógicas de{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  transacciones
                </span>{" "}
                de las imágenes tienen{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  un espacio abierto de acceso donde los intercambios son
                  sensibles y colectivos
                </span>
                ? ¿Qué{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  valor
                </span>
                tendrían esas imágenes una vez que{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  se degradan en calidad visual pero aumentan su información
                  sensible
                </span>
                ?
              </p>
            </div>
          </section>
          <section className="flex flex-col justify-around min-h-screen">
            <div className="w-full px-8 py-4 font-bold bg-black bg-opacity-50">
              <h1 className="text-lg font-bold md:text-4xl font-montserrat">
                <span className="block text-purple-500">
                  UN ARCHIVO COLECTIVO A PARTIR DEL DESCARTE:
                </span>
                <span className="block">
                  SENSIBILIDAD A PARTIR DEL INTERCAMBIO.
                </span>
              </h1>
            </div>
            <div className="px-8 py-4 bg-black bg-opacity-50 font-rubik">
              <p>
                Un espacio{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  atemporal
                </span>
                , con sus propias{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  reglas
                </span>
                :{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  el espacio de las imágenes es en pixeles, el de la
                  sensibilidad es infinito
                </span>
                . <span className="font-montserrat">DESCARTES</span> es un
                proyecto que explora esas condiciones, estando disponible su
                interacción por{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  periodos breves, almacenando una cantidad limitada de pixeles
                  y una infinita información sensible sobre los contenidos de
                  los mismos
                </span>
                . Para acceder al archivo colectivo,{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  es necesaria una transacción
                </span>
                : es necesario hacer espacio para los pixeles que van a ser
                ocupados por imágenes nuevas y la única forma de hacerlo es{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  liberando el espacio
                </span>{" "}
                de las que ya lo están ocupando.{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  Solamente se puede subir una imagen por sesión
                </span>
                .
              </p>
              <p>
                Toda imagen subida debe estar acompañada de un{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  epígrafe
                </span>{" "}
                que la{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  describe
                </span>
                , el nombre{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  original
                </span>{" "}
                del archivo y el tamaño{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  original
                </span>{" "}
                de la imagen.
              </p>
              <p>
                Previo a subir una imagen, se selecciona alguna de las{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  imágenes más antiguas
                </span>{" "}
                que están{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  almacenadas
                </span>{" "}
                para su &quot;
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  descarte
                </span>
                &quot;, donde{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  es necesario proveer una explicación sensible sobre la
                  decisión de descartar esa imagen
                </span>{" "}
                por sobre las demás imágenes. Una imagen &quot;descartada&quot;
                será{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  comprimida con un algoritmo
                </span>
                , hasta llegar a un{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  tamaño mínimo
                </span>{" "}
                de 1 x 1.
              </p>
              <p>
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  Subir una imagen implica someterla tarde o temprano al mismo
                  destino, pero también compartir la sensibilidad que ésta le
                  puede otorgar a otra persona que la observa o que lee los
                  datos asociados a esta
                </span>
                .
              </p>
            </div>
          </section>
          <section className="flex flex-col justify-around min-h-screen">
            <div className="w-full px-8 py-4 font-bold bg-black bg-opacity-50">
              <h1 className="text-lg font-bold md:text-4xl font-montserrat">
                <span className="block text-purple-500">PUNTAPIÉ INICIAL:</span>
                <span className="block">
                  POBLANDO EL ARCHIVO, LIMITACIONES.
                </span>
              </h1>
            </div>
            <div className="px-8 py-4 bg-black bg-opacity-50 font-rubik">
              <p>
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  En el principio, los contenidos del archivo fueron proveídos
                  por lx autorx de la obra
                </span>
                . Esto facilita a que haya contenido disponible para ver y
                descartar.
              </p>
              <p>
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  Toda imagen subida será recortada inicialmente en un tamaño de
                  1024 x 1024 y convertida a jpg
                </span>{" "}
                para poder funcionar correctamente el sitio y los algoritmos de
                compresión.
              </p>
              <p>
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  A medida que aumenta la cantidad de archivos, es necesario
                  &quot;descartar&quot; más imágenes para poder subir una propia
                </span>
                . Es posible que haya alguna imagen que jamás sea seleccionada
                para descarte y permanezca completamente intacta durante la
                duración de la obra.
              </p>
              <p>
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  La obra puede ser pausada y reanudada en cualquier momento, es
                  completamente dependiente del entorno que mantiene el servidor
                  encendido y los datos almacenados
                </span>
                .
              </p>
            </div>
          </section>
          <section className="flex flex-col justify-around min-h-screen">
            <div className="w-full px-8 py-4 font-bold bg-black bg-opacity-50">
              <h1 className="text-lg font-bold md:text-4xl font-montserrat">
                <span className="block text-purple-500">
                  LO QUE QUEDA DESPUÉS DEL DESCARTE:
                </span>
                <span className="block">¿SENSIBILIDAD O BASURA DIGITAL?</span>
              </h1>
            </div>
            <div className="px-8 py-4 bg-black bg-opacity-50">
              <p>
                Eventualmente,{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  es probable que un fragmento de los contenidos de la obra se
                  vea reducido al tamaño de 1 x 1 pixel, contando solamente con
                  la información sensible y la metadata para visibilizar lo que
                  alguna vez estuvo allí
                </span>
                . Dependerá de una{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  apreciación subjetiva
                </span>{" "}
                determinar si{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  se tratan de basura digital y malgasto de espacio o de
                  información sensible relevante para el aprecio del resto de
                  las imágenes de la obra
                </span>{" "}
                que &quot;cedieron&quot; su lugar para los contenidos nuevos.
              </p>
            </div>
          </section>
          <section className="flex flex-col justify-around min-h-screen">
            <div className="w-full px-8 py-4 font-bold bg-black bg-opacity-50">
              <h1 className="text-lg font-bold md:text-4xl font-montserrat">
                <span className="block text-purple-500">
                  HABITAR EL ARCHIVO:
                </span>
                <span className="block">
                  ¿CÓMO ES EL RECORRIDO DEL ARCHIVO?
                </span>
              </h1>
            </div>
            <div className="px-8 py-4 bg-black bg-opacity-50 font-rubik">
              <p>
                Durante toda la obra se puede escuchar una obra generativa a
                partir de tres fragmentos sonoros compuestos por{" "}
                <Link href="/creditos">
                  <a className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none">
                    Gabriel Dellarosa (Oscilación Planetaria)
                  </a>
                </Link>
                . Un algoritmo conecta los tres fragmentos sonoros de manera
                aleatoria, uno seguido de otro. Una vez se descarta una imagen y
                se sube otra en su lugar, se accede también a la{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  galería virtual
                </span>
                donde aparecen los materiales del archivo en su totalidad,
                ordenados espacialmente en base a un modelo de clasificación
                llamado{" "}
                <a
                  href="https://umap-learn.readthedocs.io/en/latest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                >
                  UMAP
                </a>
                . La galería es un{" "}
                <span className="text-fuchsia-500 hover:text-fuchsia-400">
                  espacio tridimensional
                </span>{" "}
                que se puede recorrer controlando la cámara desde el teclado. Al
                seleccionar una imagen que esté próxima, se podrá acceder a la
                información sobre la misma.
              </p>
            </div>
          </section>
          <section className="flex flex-col justify-around min-h-screen">
            <div className="w-full px-8 py-4 font-bold bg-black bg-opacity-50">
              <h1 className="text-lg font-bold md:text-4xl font-montserrat">
                <span className="block text-purple-500">FICHA TÉCNICA:</span>
                <span className="block">TECNOLOGÍAS UTILIZADAS Y ENLACES.</span>
              </h1>
            </div>
            <div className="px-8 py-4 bg-black bg-opacity-50 font-rubik">
              <p>Implementación web: (sitio actual)</p>
              <ul className="list-disc list-inside">
                <li>
                  Lenguaje de programación:{" "}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    JavaScript
                  </a>
                  .
                </li>
                <li>
                  Framework de desarrollo:{" "}
                  <a
                    href="https://nextjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    NextJS
                  </a>
                  .
                </li>
                <li>
                  UI:{" "}
                  <a
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    ReactJS
                  </a>
                  .
                </li>
                <li>
                  Estilos:{" "}
                  <a
                    href="https://tailwindcss.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    TailwindCSS
                  </a>
                  .
                </li>
                <li>
                  Visualización 3D:{" "}
                  <a
                    href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    React Three Fiber
                  </a>
                  ,{" "}
                  <a
                    href="https://threejs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    ThreeJS
                  </a>
                  .
                </li>
                <li>
                  Tipado:{" "}
                  <a
                    href="https://www.typescriptlang.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    TypeScript
                  </a>
                  .
                </li>
                <li>
                  Animaciones:{" "}
                  <a
                    href="https://www.framer.com/api/motion/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    Framer Motion
                  </a>
                  ,{" "}
                  <a
                    href="https://react-spring.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    React Spring
                  </a>
                  .
                </li>
                <li>
                  Hosting:{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    Vercel
                  </a>
                  .
                </li>
                <li>
                  Data fetching:{" "}
                  <a
                    href="https://swr.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    SWR
                  </a>
                  ,{" "}
                  <a
                    href="https://axios-http.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    axios
                  </a>
                  .
                </li>
                <li>
                  <a
                    href="https://github.com/royeden/descartes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    Repositorio
                  </a>
                  .
                </li>
              </ul>
            </div>
            <div className="px-8 py-4 bg-black bg-opacity-50 font-rubik">
              <p>Servidor y bases de datos locales</p>
              <ul className="list-disc list-inside">
                <li>
                  Lenguaje de programación:{" "}
                  <a
                    href="https://www.python.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    Python
                  </a>
                  .
                </li>
                <li>
                  Framework de desarrollo:
                  <a
                    href="https://flask.palletsprojects.com/en/2.0.x/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    Flask
                  </a>
                  ,{" "}
                  <a
                    href="https://github.com/zalando/connexion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    Connexion
                  </a>
                  .
                </li>
                <li>
                  Manejo de base de datos:
                  <a
                    href="https://flask-sqlalchemy.palletsprojects.com/en/2.x/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    Flask-SQLAlchemy
                  </a>
                  ,{" "}
                  <a
                    href="https://www.sqlalchemy.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    SQLAlchemy
                  </a>
                  .
                </li>
                <li>
                  Motor de base de datos:{" "}
                  <a
                    href="https://www.sqlite.org/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    SQLite
                  </a>
                  .
                </li>
                <li>
                  Schemas:
                  <a
                    href="https://flask-marshmallow.readthedocs.io/en/latest/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    Flask-Marshmallow
                  </a>
                  ,{" "}
                  <a
                    href="https://marshmallow.readthedocs.io/en/stable/examples.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    Marshmallow
                  </a>
                  .
                </li>
                <li>
                  Procesamiento de imágenes:{" "}
                  <a
                    href="https://pillow.readthedocs.io/en/stable/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    Pillow
                  </a>
                  .
                </li>
                <li>
                  Organización de data en el espacio 3D:{" "}
                  <a
                    href="https://umap-learn.readthedocs.io/en/latest/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    UMAP
                  </a>
                  .
                </li>
                <li>
                  <a
                    href="https://github.com/royeden/descartes-api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    Repositorio
                  </a>
                  .
                </li>
              </ul>
            </div>
            <div className="px-8 py-4 bg-black bg-opacity-50 font-rubik">
              <ul className="list-disc list-inside">
                <li>
                  Túnel local:{" "}
                  <a
                    href="https://ngrok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-fuchsia-500 hover:text-fuchsia-400 focus:text-fuchsia-400 focus:outline-none"
                  >
                    ngrok
                  </a>
                  .
                </li>
              </ul>
            </div>
          </section>
        </div>
      </article>
    </Layout>
  );
}
