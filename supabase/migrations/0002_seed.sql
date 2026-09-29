-- Seed demo (mismos 5 expedientes de lib/data.ts, UUIDs fijos para trazabilidad)

insert into clientes (id, nombre, giro, clasificacion, contacto, telefono, correo, direccion, sitio_web, rfc, notas) values
  ('00000000-0000-4000-8000-000000000001','Hotel Posada del Río','Comercial','Cautivo','Gerardo Luna · Gerente de mantenimiento','871 204 1187','mantenimiento@posadadelrio.mx','Blvd. Miguel Alemán 1204, Gómez Palacio','posadadelrio.mx','HPR-940312-K71','Acceso por andén de servicio; avisar a recepción 30 min antes. Cocina se trata después de las 10:00.'),
  ('00000000-0000-4000-8000-000000000002','Bodega Lala Norte','Industrial','Cautivo','Ing. Paola Cedillo · Jefa de inocuidad','871 318 4455','inocuidad.norte@lala.com.mx','P.I. Lagunero, Gómez Palacio','lala.com.mx','BLN-020714-QA3','Sitio BPP: evidencia sellada obligatoria en cada visita; bitácora por estación firmada por supervisor de planta. Auditoría anual en noviembre.'),
  ('00000000-0000-4000-8000-000000000003','Transportes G.L.','Industrial','Cautivo','Lic. Mario Talamantes · Gerente de patio','871 750 2210','patio@tgl.mx','Periférico km 14.5, Lerdo, Dgo.','tgl.mx','TGL-880130-HH0','Recorrido mensual de estaciones cebaderas (vista Estaciones). Acceso con gafete; caseta pide orden de servicio impresa o en app.'),
  ('00000000-0000-4000-8000-000000000004','Residencia Fam. Nava','Residencial','Nuevo','Sra. Leticia Nava · Propietaria','871 226 7741','leticia.nava@hotmail.com','Fracc. Las Rosas 14, Gómez Palacio','','','Mascotas: 2 perros — producto de baja toxicidad y tiempo de reentrada por escrito. Candidata a iguala residencial (el agente ofrece a los 21 días).'),
  ('00000000-0000-4000-8000-000000000005','Establo San Rafael','Agropecuario','Cautivo','MVZ. Homero Cázares · Administrador','871 442 9083','admon@establosanrafael.mx','Ejido La Concha, Matamoros','establosanrafael.mx','ESR-050503-3B9','Unidad de producción con BPP SENASICA: registro sanitario en cada visita. Mosca de establo estacional may–sep; roedor en silos.')
on conflict (id) do nothing;

insert into polizas (cliente_id, tipo, vigencia_desde, vigencia_hasta, frecuencia) values
  ('00000000-0000-4000-8000-000000000001','Iguala mensual','2024-03-15','2027-03-15','Mensual · 12 visitas/año'),
  ('00000000-0000-4000-8000-000000000002','Póliza semanal','2023-02-01','2027-01-31','Semanal · protocolo BPP'),
  ('00000000-0000-4000-8000-000000000003','Contrato anual','2026-01-09','2027-01-09','Mensual · 46 estaciones roedor'),
  ('00000000-0000-4000-8000-000000000004','Evento único','2026-08-12',null,'Eventual · seguimiento a 21 días'),
  ('00000000-0000-4000-8000-000000000005','Iguala mensual','2023-05-03','2027-05-03','Mensual · protocolo pecuario');

insert into disponibilidad (cliente_id, modo, canal, avisa_contacto, avisa_telefono, zona, ruta) values
  ('00000000-0000-4000-8000-000000000001','Cualquier día hábil','WhatsApp','Gerardo Luna','871 204 1187','Local','Ruta Centro'),
  ('00000000-0000-4000-8000-000000000002','Fecha fija pactada','Correo','Ing. Paola Cedillo','871 318 4455','Local','Ruta Norte industrial'),
  ('00000000-0000-4000-8000-000000000003','Cuando el cliente nos avise','WhatsApp','Lic. Mario Talamantes','871 750 2210','Local','Ruta Lerdo'),
  ('00000000-0000-4000-8000-000000000004','Cualquier día hábil','WhatsApp','Sra. Leticia Nava','871 226 7741','Local','Ruta Centro'),
  ('00000000-0000-4000-8000-000000000005','Fecha fija pactada','Llamada','MVZ. Homero Cázares','871 442 9083','Foráneo','Ruta agropecuaria')
on conflict (cliente_id) do nothing;

insert into ventanas_paro (cliente_id, dia_desde, dia_hasta, desde_hora) values
  ('00000000-0000-4000-8000-000000000003',15,20,'20:00');

insert into expediente_eventos (cliente_id, fecha, tipo, titulo, detalle, folio, tecnico, evidencias) values
  ('00000000-0000-4000-8000-000000000001','2026-08-12','Aplicación','Servicio mensual · control integral','Gel en cocina, estaciones perimetrales 1–6, trampas UV. Sin actividad relevante.','OS-4412','Ana Delgado',6),
  ('00000000-0000-4000-8000-000000000001','2026-08-09','Encuesta','Encuesta post-servicio respondida','Satisfacción 5/5 · NPS 9 · sin hallazgos nuevos reportados.','SM-0788','',0),
  ('00000000-0000-4000-8000-000000000001','2026-07-14','Aplicación','Servicio mensual + refuerzo en almacén','Consumo de cebo 50% en estación 4: se repuso y se agregó estación de refuerzo.','OS-4287','Ana Delgado',8),
  ('00000000-0000-4000-8000-000000000001','2026-06-18','Incidencia','Reporte de mosca en terraza','Llamada del cliente; visita correctiva en 24 h. Origen: contenedor de basura vecino.','INC-112','Marco Ríos',3),
  ('00000000-0000-4000-8000-000000000001','2026-06-16','Aplicación','Servicio mensual','Ciclo normal. Recomendación de saneamiento en patio de servicio.','OS-4180','Ana Delgado',5),
  ('00000000-0000-4000-8000-000000000001','2024-03-15','Primera revisión','Diagnóstico inicial y alta de iguala','Infestación moderada de cucaracha en cocina; plano de 6 estaciones perimetrales; se firma iguala mensual.','DX-0451','Roberto G.',12),
  ('00000000-0000-4000-8000-000000000002','2026-08-12','Aplicación','Recorrido semanal · 24 estaciones','Consumo en estaciones 7 y 15 (25%); nebulización ULV en andén 3.','OS-4419','Diana Márquez',24),
  ('00000000-0000-4000-8000-000000000002','2026-08-05','Certificado','Certificado mensual BPP emitido','Paquete de evidencia y bitácoras jul · enviado a inocuidad y al archivo digital.','CRM-2026-0790','',0),
  ('00000000-0000-4000-8000-000000000002','2026-07-29','Seguimiento','Refuerzo en estación 15','Consumo sostenido 3 semanas: segunda estación instalada, acceso sellado con malla.','OS-4361','Diana Márquez',9),
  ('00000000-0000-4000-8000-000000000002','2023-02-01','Primera revisión','Diagnóstico inicial y plano de estaciones','Plano de 24 estaciones perimetrales e internas; protocolo BPP acordado con inocuidad.','DX-0298','Roberto G.',18),
  ('00000000-0000-4000-8000-000000000003','2026-09-11','Aplicación','Recorrido 46 · estaciones roedor','Estación 25 al 100% por tercer mes: refuerzo propuesto (ver recomendación en vista Estaciones).','OS-4501','Raúl Ávila',46),
  ('00000000-0000-4000-8000-000000000003','2026-08-07','Aplicación','Recorrido 45','Pico de consumo general en descenso tras refuerzos de julio.','OS-4390','Raúl Ávila',46),
  ('00000000-0000-4000-8000-000000000003','2026-07-10','Seguimiento','Refuerzo zona de silos','4 estaciones adicionales en silos por consumo alto sostenido; maleza retirada por el cliente.','OS-4302','Raúl Ávila',11),
  ('00000000-0000-4000-8000-000000000003','2026-01-09','Primera revisión','Renovación anual y actualización de plano','Contrato renovado; plano actualizado a 46 estaciones (4 nuevas en patio sur).','DX-0512','Roberto G.',8),
  ('00000000-0000-4000-8000-000000000004','2026-08-12','Primera revisión','Diagnóstico y primer servicio','Cucaracha en cocina (moderada) y alacrán en patio. Gel + aspersión perimetral.','OS-4431','Ana Delgado',4),
  ('00000000-0000-4000-8000-000000000005','2026-08-12','Aplicación','Servicio mensual · corrales y silos','Larvicida en corrales 1–4; cebo repuesto en silos. Registro SENASICA firmado.','OS-4401','Raúl Ávila',14),
  ('00000000-0000-4000-8000-000000000005','2026-07-15','Incidencia','Brote de mosca por lluvia','Visita extraordinaria: nebulización térmica en corrales; se recomendó drenaje de encharcamiento.','INC-118','Raúl Ávila',7),
  ('00000000-0000-4000-8000-000000000005','2026-07-12','Aplicación','Servicio mensual','Ciclo normal previo al pico de temporada.','OS-4290','Raúl Ávila',12),
  ('00000000-0000-4000-8000-000000000005','2023-05-03','Primera revisión','Diagnóstico inicial y alta de iguala','Programa de mosca de establo y roedor; requisitos BPP levantados con el MVZ responsable.','DX-0331','Roberto G.',16);

insert into tecnicos (id, nombre, iniciales, color, unidad, placas, zona) values
  ('t1','Marco Ríos','MR','#cb2027','Unidad 04','DGA-24-31','Torreón Norte'),
  ('t2','Luis Herrera','LH','#3a4e8c','Unidad 07','DGB-11-07','Torreón Sur'),
  ('t3','Ana Delgado','AD','#1f7a72','Unidad 02','DGA-88-12','Gómez Palacio'),
  ('t4','Jorge Sifuentes','JS','#c88a17','Unidad 09','DGC-45-90','Lerdo'),
  ('t5','Diana Márquez','DM','#7a3b6b','Unidad 05','DGA-52-18','Industrial'),
  ('t6','Raúl Ávila','RA','#5e7a2e','Unidad 11','DGB-77-04','Agropecuario')
on conflict (id) do nothing;

insert into insumos (nombre, unidad, presentacion, presentacion_qty, stock, tope_minimo, costo_unitario, proveedor) values
  ('Cipermetrina 10% EC','L','Garrafa 20 L',20,34,20,385,'Agroquímicos del Nazas'),
  ('Gel cucarachicida','pz','Caja 24 pz',24,41,30,118,'BioControl MX'),
  ('Cebo rodenticida','kg','Cubeta 8 kg',8,14,25,96,'BioControl MX'),
  ('Larvicida de establo','L','Garrafa 10 L',10,22,15,410,'Agroquímicos del Nazas'),
  ('Insecticida de follaje','L','Garrafa 20 L',20,9,12,298,'Verde Campo'),
  ('Fungicida sistémico','L','Garrafa 5 L',5,11,6,512,'Verde Campo'),
  ('Estaciones de cebo','pz','Caja 12 pz',12,26,24,145,'BioControl MX'),
  ('Lámina adhesiva UV','pz','Paquete 10 pz',10,8,20,62,'BioControl MX')
on conflict (nombre) do nothing;
