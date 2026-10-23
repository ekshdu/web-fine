--
-- PostgreSQL database dump
--

\restrict BG8lVvZV0ITRU96uIvSwP4ehaBnYdArnzG25f7GVcDIlfsae3tT6uQxyhQ0NJhh

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: car; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car (
    id integer NOT NULL,
    id_driver integer,
    car_num character varying(10) NOT NULL,
    car_model character varying(100)
);


ALTER TABLE public.car OWNER TO postgres;

--
-- Name: car_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.car_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.car_id_seq OWNER TO postgres;

--
-- Name: car_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.car_id_seq OWNED BY public.car.id;


--
-- Name: driver; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.driver (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    surname character varying(100) NOT NULL,
    middle_name character varying(100),
    place_of_birth character varying(100),
    date_of_birth date,
    id_gender integer
);


ALTER TABLE public.driver OWNER TO postgres;

--
-- Name: driver_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.driver_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.driver_id_seq OWNER TO postgres;

--
-- Name: driver_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.driver_id_seq OWNED BY public.driver.id;


--
-- Name: emp_gibdd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.emp_gibdd (
    id integer NOT NULL,
    id_user integer,
    name character varying(100) NOT NULL,
    surname character varying(100) NOT NULL,
    middle_name character varying(100),
    phone_number character varying(20)
);


ALTER TABLE public.emp_gibdd OWNER TO postgres;

--
-- Name: emp_gibdd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.emp_gibdd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.emp_gibdd_id_seq OWNER TO postgres;

--
-- Name: emp_gibdd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.emp_gibdd_id_seq OWNED BY public.emp_gibdd.id;


--
-- Name: fine_section; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fine_section (
    id integer NOT NULL,
    section_num character varying(40) NOT NULL
);


ALTER TABLE public.fine_section OWNER TO postgres;

--
-- Name: fine_section_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fine_section_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fine_section_id_seq OWNER TO postgres;

--
-- Name: fine_section_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fine_section_id_seq OWNED BY public.fine_section.id;


--
-- Name: fine_speed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fine_speed (
    id integer NOT NULL,
    fine_speedcol integer NOT NULL
);


ALTER TABLE public.fine_speed OWNER TO postgres;

--
-- Name: fine_speed_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fine_speed_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fine_speed_id_seq OWNER TO postgres;

--
-- Name: fine_speed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fine_speed_id_seq OWNED BY public.fine_speed.id;


--
-- Name: fine_sum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fine_sum (
    id integer NOT NULL,
    summary real NOT NULL
);


ALTER TABLE public.fine_sum OWNER TO postgres;

--
-- Name: fine_sum_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fine_sum_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fine_sum_id_seq OWNER TO postgres;

--
-- Name: fine_sum_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fine_sum_id_seq OWNED BY public.fine_sum.id;


--
-- Name: gender; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gender (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public.gender OWNER TO postgres;

--
-- Name: gender_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gender_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gender_id_seq OWNER TO postgres;

--
-- Name: gender_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gender_id_seq OWNED BY public.gender.id;


--
-- Name: status_fine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status_fine (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.status_fine OWNER TO postgres;

--
-- Name: status_fine_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_fine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.status_fine_id_seq OWNER TO postgres;

--
-- Name: status_fine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_fine_id_seq OWNED BY public.status_fine.id;


--
-- Name: traffic_fine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.traffic_fine (
    id integer NOT NULL,
    id_emp integer,
    id_car integer,
    date_time timestamp without time zone NOT NULL,
    num_post character varying(20) NOT NULL,
    fine_place character varying(255),
    id_fine_sum integer,
    id_status_fine integer,
    id_speed_fine integer,
    id_fine_section integer,
    actual_speed integer
);


ALTER TABLE public.traffic_fine OWNER TO postgres;

--
-- Name: traffic_fine_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.traffic_fine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.traffic_fine_id_seq OWNER TO postgres;

--
-- Name: traffic_fine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.traffic_fine_id_seq OWNED BY public.traffic_fine.id;


--
-- Name: user_emp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_emp (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.user_emp OWNER TO postgres;

--
-- Name: user_emp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_emp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_emp_id_seq OWNER TO postgres;

--
-- Name: user_emp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_emp_id_seq OWNED BY public.user_emp.id;


--
-- Name: car id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car ALTER COLUMN id SET DEFAULT nextval('public.car_id_seq'::regclass);


--
-- Name: driver id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver ALTER COLUMN id SET DEFAULT nextval('public.driver_id_seq'::regclass);


--
-- Name: emp_gibdd id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emp_gibdd ALTER COLUMN id SET DEFAULT nextval('public.emp_gibdd_id_seq'::regclass);


--
-- Name: fine_section id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fine_section ALTER COLUMN id SET DEFAULT nextval('public.fine_section_id_seq'::regclass);


--
-- Name: fine_speed id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fine_speed ALTER COLUMN id SET DEFAULT nextval('public.fine_speed_id_seq'::regclass);


--
-- Name: fine_sum id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fine_sum ALTER COLUMN id SET DEFAULT nextval('public.fine_sum_id_seq'::regclass);


--
-- Name: gender id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gender ALTER COLUMN id SET DEFAULT nextval('public.gender_id_seq'::regclass);


--
-- Name: status_fine id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status_fine ALTER COLUMN id SET DEFAULT nextval('public.status_fine_id_seq'::regclass);


--
-- Name: traffic_fine id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_fine ALTER COLUMN id SET DEFAULT nextval('public.traffic_fine_id_seq'::regclass);


--
-- Name: user_emp id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_emp ALTER COLUMN id SET DEFAULT nextval('public.user_emp_id_seq'::regclass);


--
-- Data for Name: car; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.car (id, id_driver, car_num, car_model) FROM stdin;
1	1	А456АА	TOYOTA Mark II
\.


--
-- Data for Name: driver; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.driver (id, name, surname, middle_name, place_of_birth, date_of_birth, id_gender) FROM stdin;
1	Андрей	Косолапов	Васильевич 	г. Киров, Кировская обл., Россия	2002-06-19	1
\.


--
-- Data for Name: emp_gibdd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.emp_gibdd (id, id_user, name, surname, middle_name, phone_number) FROM stdin;
1	1	Ольга	Меньшова	Сергеевна	78983431111
\.


--
-- Data for Name: fine_section; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fine_section (id, section_num) FROM stdin;
1	12.9 ч.2
2	12.9 ч.3
3	12.12 ч.1
4	12.16 ч.1
\.


--
-- Data for Name: fine_speed; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fine_speed (id, fine_speedcol) FROM stdin;
1	60
2	80
3	90
4	110
\.


--
-- Data for Name: fine_sum; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fine_sum (id, summary) FROM stdin;
1	500
2	1000
3	1500
4	3000
5	5000
\.


--
-- Data for Name: gender; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gender (id, name) FROM stdin;
1	Мужской
2	Женский
\.


--
-- Data for Name: status_fine; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status_fine (id, name) FROM stdin;
1	Оплачен
2	Не оплачен
3	Просрочен
\.


--
-- Data for Name: traffic_fine; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.traffic_fine (id, id_emp, id_car, date_time, num_post, fine_place, id_fine_sum, id_status_fine, id_speed_fine, id_fine_section, actual_speed) FROM stdin;
\.


--
-- Data for Name: user_emp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_emp (id, username, password) FROM stdin;
1	us1	1234
\.


--
-- Name: car_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.car_id_seq', 1, true);


--
-- Name: driver_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.driver_id_seq', 1, true);


--
-- Name: emp_gibdd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.emp_gibdd_id_seq', 1, false);


--
-- Name: fine_section_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fine_section_id_seq', 4, true);


--
-- Name: fine_speed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fine_speed_id_seq', 4, true);


--
-- Name: fine_sum_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fine_sum_id_seq', 5, true);


--
-- Name: gender_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gender_id_seq', 2, true);


--
-- Name: status_fine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_fine_id_seq', 3, true);


--
-- Name: traffic_fine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.traffic_fine_id_seq', 1, false);


--
-- Name: user_emp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_emp_id_seq', 1, false);


--
-- Name: car car_car_num_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT car_car_num_key UNIQUE (car_num);


--
-- Name: car car_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT car_pkey PRIMARY KEY (id);


--
-- Name: driver driver_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT driver_pkey PRIMARY KEY (id);


--
-- Name: emp_gibdd emp_gibdd_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emp_gibdd
    ADD CONSTRAINT emp_gibdd_pkey PRIMARY KEY (id);


--
-- Name: fine_section fine_section_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fine_section
    ADD CONSTRAINT fine_section_pkey PRIMARY KEY (id);


--
-- Name: fine_speed fine_speed_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fine_speed
    ADD CONSTRAINT fine_speed_pkey PRIMARY KEY (id);


--
-- Name: fine_sum fine_sum_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fine_sum
    ADD CONSTRAINT fine_sum_pkey PRIMARY KEY (id);


--
-- Name: gender gender_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gender
    ADD CONSTRAINT gender_pkey PRIMARY KEY (id);


--
-- Name: status_fine status_fine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status_fine
    ADD CONSTRAINT status_fine_pkey PRIMARY KEY (id);


--
-- Name: traffic_fine traffic_fine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_fine
    ADD CONSTRAINT traffic_fine_pkey PRIMARY KEY (id);


--
-- Name: user_emp user_emp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_emp
    ADD CONSTRAINT user_emp_pkey PRIMARY KEY (id);


--
-- Name: user_emp user_emp_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_emp
    ADD CONSTRAINT user_emp_username_key UNIQUE (username);


--
-- Name: idx_car_car_num; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_car_car_num ON public.car USING btree (car_num);


--
-- Name: idx_traffic_fine_datetime; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_traffic_fine_datetime ON public.traffic_fine USING btree (date_time);


--
-- Name: idx_traffic_fine_numpost; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_traffic_fine_numpost ON public.traffic_fine USING btree (num_post);


--
-- Name: car car_id_driver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT car_id_driver_fkey FOREIGN KEY (id_driver) REFERENCES public.driver(id) ON DELETE CASCADE;


--
-- Name: driver driver_id_gender_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT driver_id_gender_fkey FOREIGN KEY (id_gender) REFERENCES public.gender(id);


--
-- Name: emp_gibdd emp_gibdd_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emp_gibdd
    ADD CONSTRAINT emp_gibdd_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.user_emp(id);


--
-- Name: traffic_fine traffic_fine_id_car_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_fine
    ADD CONSTRAINT traffic_fine_id_car_fkey FOREIGN KEY (id_car) REFERENCES public.car(id) ON DELETE CASCADE;


--
-- Name: traffic_fine traffic_fine_id_emp_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_fine
    ADD CONSTRAINT traffic_fine_id_emp_fkey FOREIGN KEY (id_emp) REFERENCES public.emp_gibdd(id);


--
-- Name: traffic_fine traffic_fine_id_fine_section_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_fine
    ADD CONSTRAINT traffic_fine_id_fine_section_fkey FOREIGN KEY (id_fine_section) REFERENCES public.fine_section(id);


--
-- Name: traffic_fine traffic_fine_id_fine_sum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_fine
    ADD CONSTRAINT traffic_fine_id_fine_sum_fkey FOREIGN KEY (id_fine_sum) REFERENCES public.fine_sum(id);


--
-- Name: traffic_fine traffic_fine_id_speed_fine_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_fine
    ADD CONSTRAINT traffic_fine_id_speed_fine_fkey FOREIGN KEY (id_speed_fine) REFERENCES public.fine_speed(id);


--
-- Name: traffic_fine traffic_fine_id_status_fine_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_fine
    ADD CONSTRAINT traffic_fine_id_status_fine_fkey FOREIGN KEY (id_status_fine) REFERENCES public.status_fine(id);


--
-- PostgreSQL database dump complete
--

\unrestrict BG8lVvZV0ITRU96uIvSwP4ehaBnYdArnzG25f7GVcDIlfsae3tT6uQxyhQ0NJhh

