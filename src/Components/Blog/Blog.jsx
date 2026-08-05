import { useEffect, useState } from 'react';
import { FiEdit3, FiMapPin, FiMessageCircle, FiStar } from 'react-icons/fi';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './blog.css';
import img from '../../assets/gringos.webp';
import img2 from '../../assets/embarcacion.webp';
import img3 from '../../assets/catador.webp';
import img4 from '../../assets/casahaci.webp';

const initialPosts = [
  { id: 1, name: 'María', destination: 'Nazca', rating: 5, postImage: img, title: 'Historia que sorprende', comment: 'Los acueductos y las Líneas de Nazca hicieron que la visita se sintiera como un viaje por la ingeniería del antiguo Perú.' },
  { id: 2, name: 'Carlos', destination: 'Ica', rating: 4, postImage: img3, title: 'Sabores y tradición', comment: 'La visita a una bodega formal permitió conocer el proceso del pisco y disfrutar una degustación responsable.' },
  { id: 3, name: 'Ana', destination: 'Paracas', rating: 5, postImage: img2, title: 'Naturaleza inolvidable', comment: 'La navegación y la observación de fauna fueron lo mejor. Llevar cortaviento hizo una gran diferencia.' },
  { id: 4, name: 'Luis', destination: 'Chincha', rating: 4, postImage: img4, title: 'Memoria y cultura', comment: 'La visita guiada ayudó a comprender mejor la historia de la hacienda y la presencia afroperuana en Chincha.' },
];

const readPosts = () => {
  try { return JSON.parse(localStorage.getItem('safetravel-community-posts')) ?? []; } catch { return []; }
};

const Blog = () => {
  const [communityPosts, setCommunityPosts] = useState(readPosts);
  const [feedback, setFeedback] = useState('');
  const [form, setForm] = useState({ name: '', destination: '', rating: '5', title: '', comment: '' });
  useEffect(() => { Aos.init({ duration: 700, once: true }); }, []);

  const updateForm = ({ target: { name, value } }) => setForm((current) => ({ ...current, [name]: value }));
  const submitExperience = (event) => {
    event.preventDefault();
    const post = { id: Date.now(), ...form, name: form.name.trim(), destination: form.destination.trim(), title: form.title.trim(), comment: form.comment.trim(), rating: Number(form.rating), createdAt: new Date().toISOString() };
    if (!post.name || !post.destination || !post.title || post.comment.length < 20) { setFeedback('Completa todos los campos y escribe al menos 20 caracteres en tu experiencia.'); return; }
    const nextPosts = [post, ...communityPosts].slice(0, 12);
    setCommunityPosts(nextPosts);
    localStorage.setItem('safetravel-community-posts', JSON.stringify(nextPosts));
    setForm({ name: '', destination: '', rating: '5', title: '', comment: '' });
    setFeedback('Tu experiencia se publicó correctamente en este dispositivo.');
  };
  const removeExperience = (id) => {
    const nextPosts = communityPosts.filter((post) => post.id !== id);
    setCommunityPosts(nextPosts);
    localStorage.setItem('safetravel-community-posts', JSON.stringify(nextPosts));
    setFeedback('La experiencia se eliminó de este dispositivo.');
  };

  const posts = [...communityPosts, ...initialPosts];
  return (
    <section className="blog container section" id="comunidad">
      <div className="secContainer">
        <div className="secIntro"><span className="eyebrow dark">Comunidad viajera</span><h2 className="secTitle">Comparte tu experiencia y deja tu huella</h2><p>Cuenta qué aprendiste y ayuda a otros viajeros a tomar mejores decisiones.</p></div>
        <div className="communityLayout">
          <form className="experienceForm" onSubmit={submitExperience}>
            <div className="formTitle"><FiEdit3 /><div><h3>Publicar una experiencia</h3><p>Tu comentario se guardará localmente en este navegador.</p></div></div>
            <div className="formRow"><label>Nombre<input name="name" maxLength="40" value={form.name} onChange={updateForm} placeholder="Tu nombre" /></label><label>Destino<input name="destination" maxLength="50" value={form.destination} onChange={updateForm} placeholder="Ej. Paracas" /></label></div>
            <div className="formRow"><label>Calificación<select name="rating" value={form.rating} onChange={updateForm}>{[5,4,3,2,1].map((rating) => <option key={rating} value={rating}>{rating} estrellas</option>)}</select></label><label>Título<input name="title" maxLength="70" value={form.title} onChange={updateForm} placeholder="Resume tu experiencia" /></label></div>
            <label>Comentario<textarea name="comment" minLength="20" maxLength="500" rows="5" value={form.comment} onChange={updateForm} placeholder="¿Qué recomendarías a otro viajero?" /></label>
            <div className="formFooter"><small>{form.comment.length}/500 caracteres</small><button type="submit">Publicar experiencia</button></div>
            {feedback && <p className="formFeedback" role="status">{feedback}</p>}
          </form>
          <aside className="communityPromise"><FiMessageCircle /><h3>Una comunidad útil y respetuosa</h3><p>No compartas teléfonos, documentos, datos bancarios ni información sensible. En una versión con servidor, los comentarios necesitarían moderación y cuentas de usuario.</p></aside>
        </div>
        <div className="mainContainer postsGrid">
          {posts.map(({ id, postImage, name, destination, rating, title, comment, createdAt }) => <article key={id} className="singlePost" data-aos="fade-up">
            {postImage && <div className="imgDiv"><img src={postImage} alt="" loading="lazy" /></div>}
            <div className="postDetails"><div className="postMeta"><span><FiMapPin />{destination}</span><span><FiStar />{rating}/5</span></div><h3>{title}</h3><p>{comment}</p><footer><strong>{name}</strong>{createdAt && <><time dateTime={createdAt}>{new Intl.DateTimeFormat('es-PE', { dateStyle: 'medium' }).format(new Date(createdAt))}</time><button type="button" onClick={() => removeExperience(id)} aria-label={`Eliminar experiencia de ${name}`}>Eliminar</button></>}</footer></div>
          </article>)}
        </div>
      </div>
    </section>
  );
};

export default Blog;
