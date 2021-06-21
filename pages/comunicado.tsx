import { Layout } from "~components/Layout";

export default function Comunicado() {
  return (
    <Layout
      className="flex flex-col flex-1 w-full h-full min-h-full px-4 py-2 text-black"
      footer={true}
      seo={{
        description: "",
        title:
          "Sobre la situación actual de la carrera de Artes Electrónicas en UNTREF.",
      }}
    >
      <h1 className="text-4xl font-bold mix-blend-exclusion">
        Sobre la situación actual de la carrera de Artes Electrónicas en la
        UNTREF:
      </h1>
      <p className="text-black">
        Me parece inaceptable que en el contexto corriente de nuestra carrera,
        teniendo toda una situación que aglomera muchísimas problemáticas
        conjuntas.
      </p>
      <p className="text-black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        tenetur, nesciunt officiis numquam vero aut tempore impedit saepe,
        inventore in autem qui earum atque velit minus sequi, rem dolore amet.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ea
        perspiciatis quisquam officia et minus. Consectetur dolores, assumenda
        animi omnis commodi non eveniet rerum autem sed inventore accusantium
        consequatur ut. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Laborum, consequuntur? Blanditiis possimus placeat dolorum ab
        accusantium est, quo debitis cum hic? Aliquid veniam repellat, labore
        adipisci obcaecati odit facere quasi? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Fugit, quasi. Saepe blanditiis id eaque.
        Ullam, ut placeat et eaque tempore, nesciunt eius iure vitae optio
        numquam voluptas doloribus quo sunt. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Sunt id illo veritatis dolore repellendus
        libero, ea facere. Voluptates beatae, numquam cupiditate porro
        dignissimos, eum laudantium repellat non, sequi vitae cum? Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Quibusdam sapiente hic
        facere nisi sed. Aspernatur enim ullam, qui provident commodi sunt quam
        vitae natus voluptatem eius facere officiis fuga aperiam. Lorem, ipsum
        dolor sit amet consectetur adipisicing elit. Ipsam quo harum voluptates
        voluptatem atque delectus ut quae dolorem amet dicta provident, quidem
        tempora corrupti mollitia eligendi nihil veritatis. Alias, illo.
      </p>
    </Layout>
  );
}
