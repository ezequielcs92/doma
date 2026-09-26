-- Replace placeholder content with DOMA's real content (from "Correcciones Pagina Web").
-- Generated from the fallback content in the codebase so both stay in sync.
-- Run once in the Supabase SQL editor. Everything runs in a single transaction.

begin;

-- Placeholder before/after rows point at placeholder doctors.
delete from public.antes_despues;

-- If a lead still references a placeholder doctor through a foreign key, this
-- delete fails and the whole transaction rolls back without changing anything.
delete from public.medicos where slug in ('doctor-1', 'doctor-2', 'pablo-vega', 'majo-arauz');

insert into public.medicos (nombre, especialidad, matricula, foto_url, video_url, curriculum, trayectoria, slug)
values ('Dr. Pablo Vega', 'Cirugía Plástica y Reconstructiva', 'M.N. 170504', '/images/team/pablo-vega.webp', null,
  array['Especialista en Cirugía Plástica estética y reconstructiva', 'Amplia experiencia en técnicas de cirugía de contorno corporal']::text[],
  'Especialista en cirugía plástica y contorno corporal avanzado con amplia experiencia en procedimientos de alta precisión. Su enfoque está orientado a lograr resultados naturales, definidos y seguros de cada paciente.',
  'pablo-vega');

insert into public.medicos (nombre, especialidad, matricula, foto_url, video_url, curriculum, trayectoria, slug)
values ('Dra. Majo Arauz', 'Cirugía Facial y Medicina Estética', 'M.N. 174190', '/images/team/majo-arauz.webp', null,
  array['Especialista en Cirugía plástica estética y reconstructiva', 'Formación avanzada en Plástica Facial']::text[],
  'Médica especializada en rejuvenecimiento y armonización facial, enfocada en lograr resultados naturales y equilibrados respetando la identidad de cada paciente. Trabaja con técnicas avanzadas tanto quirúrgicas como de medicina estética, priorizando la precisión, la seguridad y un enfoque personalizado.',
  'majo-arauz');

delete from public.blog_posts where slug in ('recuperacion-liposuccion-hd', 'tendencias-medicina-estetica-natural', 'como-elegir-tu-cirujano-estetico', 'lipo-o-abdominoplastia', 'botox-y-acido-hialuronico', 'que-es-un-mommy-makeover', 'resultados-naturales-medicina-estetica');

insert into public.blog_posts (slug, title, excerpt, cover, date, author, category, content)
values ('como-elegir-tu-cirujano-estetico', 'Cómo elegir tu cirujano estético', 'Claves médicas y estéticas para tomar una decisión segura antes de cualquier procedimiento.', '/images/team/DOMA-h.webp', '2026-03-10', 'Equipo DOMA', 'Guía',
  '## Cómo elegir un cirujano estético de forma segura
Elegir al profesional adecuado es clave para lograr un buen resultado y transitar el proceso con tranquilidad.
### Estas son las 5 cosas más importantes a tener en cuenta:
✔️ **Formación y experiencia** — Asegurate de que el profesional tenga experiencia en el procedimiento que estás buscando.
✔️ **Seguridad del lugar** — La cirugía debe realizarse en un sanatorio habilitado, con el equipo necesario.
✔️ **Resultados reales** — Revisar casos reales te permite entender el estilo de trabajo y los resultados que podés esperar.
✔️ **Acompañamiento** — El seguimiento antes y después de la cirugía es fundamental para una buena recuperación.
✔️ **Confianza** — Sentirte cómoda y segura en la consulta es clave para tomar una decisión.
### Conclusión
Un buen resultado no depende solo de la cirugía, sino del equipo y el proceso completo.
Si estás evaluando realizarte un procedimiento, podés agendar una consulta con nuestro equipo para recibir una evaluación personalizada.')
;

insert into public.blog_posts (slug, title, excerpt, cover, date, author, category, content)
values ('lipo-o-abdominoplastia', '¿Lipo o abdominoplastia? Cómo saber cuál necesitás', 'Es una de las dudas más frecuentes en consulta. Aunque ambos procedimientos trabajan el abdomen, no son lo mismo.', '/images/team/DOMA_Personal-h.webp', '2026-03-06', 'Dr. Pablo Vega', 'Procedimientos',
  '## ¿Lipo o abdominoplastia? Cómo saber cuál necesitás
Es una de las dudas más frecuentes en consulta. Aunque ambos procedimientos trabajan el abdomen, no son lo mismo.
### Lipoescultura
Está indicada cuando hay grasa localizada, pero la piel tiene buena elasticidad. Permite moldear el contorno corporal y definir la cintura.
### Abdominoplastia
Se recomienda cuando hay flacidez o exceso de piel, especialmente después de embarazos o cambios de peso. Permite retirar piel sobrante y lograr un abdomen más plano y firme.
### Entonces, ¿cuál es mejor?
Depende de tu caso:
- Si predomina la grasa → lipo
- Si hay piel floja → abdominoplastia
- En muchos casos → combinación de ambas
### Conclusión
Una correcta evaluación es clave para elegir el procedimiento adecuado y lograr un resultado armónico.
Si querés saber qué es lo ideal en tu caso, podés enviarnos fotos o agendar una consulta con el equipo para una evaluación personalizada.')
;

insert into public.blog_posts (slug, title, excerpt, cover, date, author, category, content)
values ('botox-y-acido-hialuronico', 'Botox y ácido hialurónico: ¿cuál es mejor para vos?', 'Es una de las dudas más comunes en medicina estética. Aunque muchas veces se confunden, cumplen funciones diferentes.', '/images/team/DOMA_Personal-2-h.webp', '2026-02-28', 'Dra. Majo Arauz', 'Medicina Estética',
  '## Botox y ácido hialurónico: ¿cuál es mejor para vos?
Es una de las dudas más comunes en medicina estética. Aunque muchas veces se confunden, cumplen funciones diferentes.
### Botox (toxina botulínica)
Se utiliza para relajar los músculos responsables de las líneas de expresión. Ideal para:
- Arrugas en frente
- Entrecejo
- Patas de gallo
✔️ Previene y suaviza arrugas dinámicas
✔️ Resultado natural sin perder expresión
### Ácido hialurónico
Se utiliza para aportar volumen, hidratar y mejorar la calidad de la piel. Ideal para:
- Labios
- Ojeras
- Pómulos
- Surcos
✔️ Rellena y redefine
✔️ Mejora la hidratación y el aspecto de la piel
### Entonces, ¿cuál necesito?
Depende de tu objetivo:
- Arrugas de expresión → Botox
- Volumen o contorno → Ácido hialurónico
- Muchas veces → combinación de ambos
### Conclusión
No se trata de elegir uno u otro, sino de entender qué necesita tu rostro para lograr un resultado natural y armónico.
Si querés saber qué es lo ideal en tu caso, podés agendar una consulta y recibir una evaluación personalizada.')
;

insert into public.blog_posts (slug, title, excerpt, cover, date, author, category, content)
values ('que-es-un-mommy-makeover', '¿Qué es un Mommy Makeover y cuándo conviene hacerlo?', 'Después del embarazo, muchas mujeres notan cambios en su cuerpo que no logran revertir solo con ejercicio o alimentación.', '/images/team/DOMA_Personal-3-h.webp', '2026-02-20', 'Dr. Pablo Vega', 'Procedimientos',
  '## ¿Qué es un Mommy Makeover y cuándo conviene hacerlo?
Después del embarazo, muchas mujeres notan cambios en su cuerpo que no logran revertir solo con ejercicio o alimentación. El Mommy Makeover es una combinación de procedimientos pensada para recuperar la figura de forma integral.
### ¿Qué incluye?
Depende de cada caso, pero generalmente combina:
- Abdominoplastia (para el abdomen)
- Lipoescultura (para cintura y contorno)
- Cirugía mamaria (aumento, levantamiento o reducción)
### ¿Cuándo está indicado?
✔️ Cuando hay flacidez abdominal
✔️ Cambios en el volumen o forma de las mamas
✔️ Grasa localizada que no se reduce
### ¿Cuándo es el mejor momento?
Se recomienda cuando:
✔️ Ya pasaron varios meses desde el parto
✔️ No estás en período de lactancia
✔️ Tu peso está estable
### Ventajas
✔️ Se trabajan varias zonas en una sola cirugía
✔️ Resultados más armónicos
✔️ Recuperación unificada
### Conclusión
El Mommy Makeover permite recuperar la figura de forma completa, siempre adaptado a las necesidades de cada paciente.
Si estás evaluando este tipo de cambio, podés agendar una consulta con el equipo para recibir una evaluación personalizada.')
;

insert into public.blog_posts (slug, title, excerpt, cover, date, author, category, content)
values ('resultados-naturales-medicina-estetica', 'Resultados naturales en medicina estética: qué significa realmente', 'Hoy el objetivo de la medicina estética no es transformar el rostro, sino realzar y armonizar sin perder la naturalidad.', '/images/team/DOMA_Personal-4-h.webp', '2026-02-15', 'Dra. Majo Arauz', 'Medicina Estética',
  '## Resultados naturales en medicina estética: qué significa realmente
Hoy el objetivo de la medicina estética no es transformar el rostro, sino realzar y armonizar sin perder la naturalidad.
### ¿Qué es un resultado natural?
Es aquel que mejora tu apariencia sin que se note el tratamiento. Te ves más fresca, más descansada, más armónica. Pero seguís siendo vos.
### ¿Cómo se logra?
Con un enfoque personalizado que combina tratamientos según cada rostro:
✔️ Toxina botulínica → suaviza líneas de expresión
✔️ Ácido hialurónico → aporta volumen y definición
✔️ Bioestimuladores → mejoran la calidad de la piel
### La clave
Menos es más. Las mejores decisiones son las que respetan tu expresión y tu identidad.
Si buscás un resultado natural, podés agendar una consulta y recibir una evaluación personalizada.')
;

commit;
