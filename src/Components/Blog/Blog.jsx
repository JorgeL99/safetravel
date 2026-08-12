import { useEffect, useRef, useState } from 'react';
import { FiCamera, FiEdit3, FiMapPin, FiMessageCircle, FiStar, FiX } from 'react-icons/fi';
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
  const [form, setForm] = useState({ name: '', destination: '', rating: '5', title: '', comment: '', postImage: '' });
  const [fileKey, setFileKey] = useState(0);
  const postsCarouselRef = useRef(null);
  const postCount = communityPosts.length + initialPosts.length;
  useEffect(() => { Aos.init({ duration: 700, once: true }); }, []);
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      const carousel = postsCarouselRef.current;
      if (!carousel) return;
      const firstCard = carousel.querySelector('.singlePost');
      const step = (firstCard?.getBoundingClientRect().width ?? 360) + 20;
      const cards = carousel.querySelectorAll('.singlePost');
      const loopPoint = cards[postCount]?.offsetLeft - cards[0]?.offsetLeft;
      if (carousel.scrollLeft >= loopPoint - 5) carousel.scrollLeft -= loopPoint;
      carousel.scrollBy({ left: step, behavior: 'smooth' });
    }, 3800);
    return () => window.clearInterval(timer);
  }, [postCount]);

  const updateForm = ({ target: { name, value } }) => setForm((current) => ({ ...current, [name]: value }));
  const selectPhoto = ({ target: { files } }) => {
    const file = files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setFeedback('Utiliza una imagen JPG, PNG o WebP.'); return; }
    if (file.size > 450 * 1024) { setFeedback('La fotografía debe pesar menos de 450 KB para poder guardarse localmente.'); return; }
    const reader = new FileReader();
    reader.onload = () => { setForm((current) => ({ ...current, postImage: reader.result })); setFeedback('Fotografía lista para publicar.'); };
    reader.readAsDataURL(file);
  };
  const submitExperience = (event) => {
    event.preventDefault();
    const post = { id: Date.now(), ...form, name: form.name.trim(), destination: form.destination.trim(), title: form.title.trim(), comment: form.comment.trim(), rating: Number(form.rating), createdAt: new Date().toISOString() };
    if (!post.name || !post.destination || !post.title || !post.postImage || post.comment.length < 20) { setFeedback('Agrega una fotografía, completa los campos y escribe al menos 20 caracteres.'); return; }
    const nextPosts = [post, ...communityPosts].slice(0, 6);
    try { localStorage.setItem('safetravel-community-posts', JSON.stringify(nextPosts)); }
    catch { setFeedback('No hay espacio suficiente. Elimina una experiencia o utiliza una fotografía más ligera.'); return; }
    setCommunityPosts(nextPosts);
    setForm({ name: '', destination: '', rating: '5', title: '', comment: '', postImage: '' });
    setFileKey((key) => key + 1);
    setFeedback('Tu experiencia se publicó correctamente en este dispositivo.');
  };
  const removeExperience = (id) => {
    const nextPosts = communityPosts.filter((post) => post.id !== id);
    setCommunityPosts(nextPosts);
    try { localStorage.setItem('safetravel-community-posts', JSON.stringify(nextPosts)); } catch { /* La eliminación sigue visible en la sesión. */ }
    setFeedback('La experiencia se eliminó de este dispositivo.');
  };

  const posts = [...communityPosts, ...initialPosts];
  const carouselPosts = [...posts, ...posts];
  return (
    <section className="blog container section" id="experiencias">
      <div className="secContainer">
        <div className="secIntro"><span className="eyebrow dark">Comunidad viajera</span><h2 className="secTitle">Comparte tu experiencia y deja tu huella</h2><p>Cuenta qué aprendiste y ayuda a otros viajeros a tomar mejores decisiones.</p></div>
        <div className="communityLayout">
          <form className="experienceForm" onSubmit={submitExperience}>
            <div className="formTitle"><FiEdit3 /><div><h3>Publicar una experiencia</h3><p>Tu comentario y fotografía se guardarán localmente en este navegador.</p></div></div>
            <div className="formRow"><label>Nombre<input name="name" maxLength="40" value={form.name} onChange={updateForm} placeholder="Tu nombre" /></label><label>Destino<input name="destination" maxLength="50" value={form.destination} onChange={updateForm} placeholder="Ej. Paracas" /></label></div>
            <div className="formRow"><label>Calificación<select name="rating" value={form.rating} onChange={updateForm}>{[5,4,3,2,1].map((rating) => <option key={rating} value={rating}>{rating} estrellas</option>)}</select></label><label>Título<input name="title" maxLength="70" value={form.title} onChange={updateForm} placeholder="Resume tu experiencia" /></label></div>
            <label className="photoField">Fotografía de la experiencia<div className={`photoDrop ${form.postImage ? 'hasPreview' : ''}`}>{form.postImage ? <><img src={form.postImage} alt="Vista previa" /><button type="button" onClick={() => { setForm((current) => ({ ...current, postImage: '' })); setFileKey((key) => key + 1); }} aria-label="Quitar fotografía"><FiX /></button></> : <><FiCamera /><span>Selecciona una imagen JPG, PNG o WebP</span><small>Máximo 450 KB</small></>}<input key={fileKey} type="file" accept="image/jpeg,image/png,image/webp" onChange={selectPhoto} required={!form.postImage} /></div></label>
            <label>Comentario<textarea name="comment" minLength="20" maxLength="500" rows="5" value={form.comment} onChange={updateForm} placeholder="¿Qué recomendarías a otro viajero?" /></label>
            <div className="formFooter"><small>{form.comment.length}/500 caracteres</small><button type="submit">Publicar experiencia</button></div>
            {feedback && <p className="formFeedback" role="status">{feedback}</p>}
          </form>
          <aside className="communityPromise"><FiMessageCircle /><h3>Una comunidad útil y respetuosa</h3><p>No compartas teléfonos, documentos, datos bancarios ni información sensible. En una versión con servidor, los comentarios necesitarían moderación y cuentas de usuario.</p></aside>
        </div>
        <div className="communityCarouselHeading"><div><h3>Historias de la comunidad</h3><p>Experiencias que recorren el Perú de forma continua.</p></div></div>
        <div className="postsCarouselFrame">
        <div className="mainContainer postsGrid" ref={postsCarouselRef} aria-label="Experiencias de viajeros">
          {carouselPosts.map(({ id, postImage, name, destination, rating, title, comment, createdAt }, index) => <article key={`${id}-${index < posts.length ? 'a' : 'b'}`} className="singlePost" aria-hidden={index >= posts.length}>
            {postImage && <div className="imgDiv"><img src={postImage} alt={`Experiencia en ${destination}`} loading="lazy" /></div>}
            <div className="postDetails"><div className="postMeta"><span><FiMapPin />{destination}</span><span><FiStar />{rating}/5</span></div><h3>{title}</h3><p>{comment}</p><footer><strong>{name}</strong>{createdAt && <><time dateTime={createdAt}>{new Intl.DateTimeFormat('es-PE', { dateStyle: 'medium' }).format(new Date(createdAt))}</time>{index < posts.length && <button type="button" onClick={() => removeExperience(id)} aria-label={`Eliminar experiencia de ${name}`}>Eliminar</button>}</>}</footer></div>
          </article>)}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
