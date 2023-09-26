--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--



ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    external_id character varying(64) NOT NULL,
    work_name character varying(256),
    full_name character varying(10240),
    business_address character varying(1024),
    physical_address character varying(1024),
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: clients_has_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients_has_users (
    id integer NOT NULL,
    user_id_fk integer NOT NULL,
    client_id_fk integer NOT NULL
);


ALTER TABLE public.clients_has_users OWNER TO postgres;

--
-- Name: clients_has_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_has_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_has_users_id_seq OWNER TO postgres;

--
-- Name: clients_has_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_has_users_id_seq OWNED BY public.clients_has_users.id;


--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_id_seq OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: counterparties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.counterparties (
    id integer NOT NULL,
    external_id character varying(64) NOT NULL,
    client_id_fk integer,
    work_name character varying(256),
    full_name character varying(10240),
    business_address character varying(1024),
    physical_address character varying(1024),
    inn character varying(12),
    kpp character varying(9),
    counterparty_type_id_fk integer NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    phone_number character varying(17)
);


ALTER TABLE public.counterparties OWNER TO postgres;

--
-- Name: counterparties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.counterparties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.counterparties_id_seq OWNER TO postgres;

--
-- Name: counterparties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.counterparties_id_seq OWNED BY public.counterparties.id;


--
-- Name: counterparty_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.counterparty_types (
    id integer NOT NULL,
    type character varying(30) NOT NULL
);


ALTER TABLE public.counterparty_types OWNER TO postgres;

--
-- Name: counterparty_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.counterparty_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.counterparty_types_id_seq OWNER TO postgres;

--
-- Name: counterparty_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.counterparty_types_id_seq OWNED BY public.counterparty_types.id;


--
-- Name: nomenclature; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nomenclature (
    id integer NOT NULL,
    external_id character varying(64),
    work_name character varying(256),
    full_name character varying(10240),
    unit_measure_id_fk integer,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.nomenclature OWNER TO postgres;

--
-- Name: nomenclature_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nomenclature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nomenclature_id_seq OWNER TO postgres;

--
-- Name: nomenclature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nomenclature_id_seq OWNED BY public.nomenclature.id;


--
-- Name: order_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_status (
    id integer NOT NULL,
    status character varying(128) NOT NULL
);


ALTER TABLE public.order_status OWNER TO postgres;

--
-- Name: order_types_id _seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."order_types_id _seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."order_types_id _seq" OWNER TO postgres;

--
-- Name: order_types_id _seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."order_types_id _seq" OWNED BY public.order_status.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    external_id character varying(64) NOT NULL,
    phone_number character varying(12),
    date timestamp without time zone,
    organization_id_fk integer,
    counterparty_id_fk integer,
    comment character varying(10240),
    order_status_id_fk integer,
    client_id_fk integer,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizations (
    id integer NOT NULL,
    external_id character varying(64) NOT NULL,
    work_name character varying(256),
    full_name character varying(10240),
    business_address character varying(1024),
    physical_address character varying(1024),
    inn character varying(12),
    kpp character varying(9),
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.organizations OWNER TO postgres;

--
-- Name: organizations_has_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizations_has_users (
    id integer NOT NULL,
    user_id_fk integer NOT NULL,
    organization_id_fk integer NOT NULL
);


ALTER TABLE public.organizations_has_users OWNER TO postgres;

--
-- Name: organizations_has_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organizations_has_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organizations_has_users_id_seq OWNER TO postgres;

--
-- Name: organizations_has_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organizations_has_users_id_seq OWNED BY public.organizations_has_users.id;


--
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organizations_id_seq OWNER TO postgres;

--
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    nomenclature_id_fk integer,
    unit_measure_id_fk integer,
    amount numeric(15,3),
    cost numeric(15,2),
    total numeric(15,2),
    sale numeric(15,2),
    vat_rate_id_fk integer,
    vat_total numeric(15,2),
    total_sum numeric(15,2),
    order_id_fk integer,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id integer NOT NULL,
    refresh_token character varying(6144) NOT NULL,
    user_device_id_fk integer NOT NULL,
    user_id_fk integer NOT NULL,
    date_expired timestamp without time zone
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tokens_id_seq OWNER TO postgres;

--
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- Name: unit_measures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unit_measures (
    id integer NOT NULL,
    name character varying(10),
    full_name character varying(30),
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.unit_measures OWNER TO postgres;

--
-- Name: unit_measures_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.unit_measures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.unit_measures_id_seq OWNER TO postgres;

--
-- Name: unit_measures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.unit_measures_id_seq OWNED BY public.unit_measures.id;


--
-- Name: user_devices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_devices (
    id integer NOT NULL,
    user_agent character varying(8192) NOT NULL,
    device_ip character varying(256) NOT NULL
);


ALTER TABLE public.user_devices OWNER TO postgres;

--
-- Name: user_devices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_devices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_devices_id_seq OWNER TO postgres;

--
-- Name: user_devices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_devices_id_seq OWNED BY public.user_devices.id;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id integer NOT NULL,
    role character varying(16)
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_roles_id_seq OWNER TO postgres;

--
-- Name: user_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_roles_id_seq OWNED BY public.user_roles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    external_id character varying(38) NOT NULL,
    login character varying(64) NOT NULL,
    email character varying(64) NOT NULL,
    full_name character varying(256) NOT NULL,
    user_role_id_fk integer,
    password character varying(512) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vat_rates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vat_rates (
    id integer NOT NULL,
    rate integer
);


ALTER TABLE public.vat_rates OWNER TO postgres;

--
-- Name: vat_rates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vat_rates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vat_rates_id_seq OWNER TO postgres;

--
-- Name: vat_rates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vat_rates_id_seq OWNED BY public.vat_rates.id;


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: clients_has_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_has_users ALTER COLUMN id SET DEFAULT nextval('public.clients_has_users_id_seq'::regclass);


--
-- Name: counterparties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.counterparties ALTER COLUMN id SET DEFAULT nextval('public.counterparties_id_seq'::regclass);


--
-- Name: counterparty_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.counterparty_types ALTER COLUMN id SET DEFAULT nextval('public.counterparty_types_id_seq'::regclass);


--
-- Name: nomenclature id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nomenclature ALTER COLUMN id SET DEFAULT nextval('public.nomenclature_id_seq'::regclass);


--
-- Name: order_status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status ALTER COLUMN id SET DEFAULT nextval('public."order_types_id _seq"'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: organizations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);


--
-- Name: organizations_has_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations_has_users ALTER COLUMN id SET DEFAULT nextval('public.organizations_has_users_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- Name: unit_measures id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_measures ALTER COLUMN id SET DEFAULT nextval('public.unit_measures_id_seq'::regclass);


--
-- Name: user_devices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_devices ALTER COLUMN id SET DEFAULT nextval('public.user_devices_id_seq'::regclass);


--
-- Name: user_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN id SET DEFAULT nextval('public.user_roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: vat_rates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vat_rates ALTER COLUMN id SET DEFAULT nextval('public.vat_rates_id_seq'::regclass);


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: clients_has_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: counterparties; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: counterparty_types; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: nomenclature; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: order_status; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: organizations_has_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: unit_measures; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_devices; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: vat_rates; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: clients_has_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_has_users_id_seq', 1, false);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_seq', 1, false);


--
-- Name: counterparties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.counterparties_id_seq', 1, false);


--
-- Name: counterparty_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.counterparty_types_id_seq', 1, false);


--
-- Name: nomenclature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nomenclature_id_seq', 1, false);


--
-- Name: order_types_id _seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."order_types_id _seq"', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: organizations_has_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organizations_has_users_id_seq', 1, false);


--
-- Name: organizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organizations_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_id_seq', 1, false);


--
-- Name: unit_measures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.unit_measures_id_seq', 1, false);


--
-- Name: user_devices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_devices_id_seq', 1, false);


--
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_roles_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: vat_rates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vat_rates_id_seq', 1, false);


--
-- Name: clients_has_users clients_has_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_has_users
    ADD CONSTRAINT clients_has_users_pkey PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: counterparties counterparties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.counterparties
    ADD CONSTRAINT counterparties_pkey PRIMARY KEY (id);


--
-- Name: counterparty_types counterparty_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.counterparty_types
    ADD CONSTRAINT counterparty_types_pkey PRIMARY KEY (id);


--
-- Name: nomenclature nomenclature_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nomenclature
    ADD CONSTRAINT nomenclature_pkey PRIMARY KEY (id);


--
-- Name: order_status order_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status
    ADD CONSTRAINT order_types_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: organizations_has_users organizations_has_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations_has_users
    ADD CONSTRAINT organizations_has_users_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- Name: unit_measures unit_measures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_measures
    ADD CONSTRAINT unit_measures_pkey PRIMARY KEY (id);


--
-- Name: user_devices user_devices_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_devices
    ADD CONSTRAINT user_devices_id_key UNIQUE (id);


--
-- Name: user_devices user_devices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_devices
    ADD CONSTRAINT user_devices_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: users users_external_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_external_id_key UNIQUE (external_id);


--
-- Name: users users_login_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_key UNIQUE (login);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vat_rates vat_rates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vat_rates
    ADD CONSTRAINT vat_rates_pkey PRIMARY KEY (id);


--
-- Name: clients_has_users clients_has_users_clients_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_has_users
    ADD CONSTRAINT clients_has_users_clients_id_fk FOREIGN KEY (client_id_fk) REFERENCES public.clients(id);


--
-- Name: clients_has_users clients_has_users_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients_has_users
    ADD CONSTRAINT clients_has_users_users_id_fk FOREIGN KEY (user_id_fk) REFERENCES public.users(id);


--
-- Name: counterparties counterparties_clients_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.counterparties
    ADD CONSTRAINT counterparties_clients_id_fk FOREIGN KEY (client_id_fk) REFERENCES public.clients(id);


--
-- Name: counterparties counterparties_counterparty_types_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.counterparties
    ADD CONSTRAINT counterparties_counterparty_types_id_fk FOREIGN KEY (counterparty_type_id_fk) REFERENCES public.counterparty_types(id);


--
-- Name: nomenclature nomenclature_unit_measures_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nomenclature
    ADD CONSTRAINT nomenclature_unit_measures_id_fk FOREIGN KEY (unit_measure_id_fk) REFERENCES public.unit_measures(id);


--
-- Name: orders orders_clients_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_clients_id_fk FOREIGN KEY (client_id_fk) REFERENCES public.clients(id);


--
-- Name: orders orders_counterparties_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_counterparties_id_fk FOREIGN KEY (counterparty_id_fk) REFERENCES public.counterparties(id);


--
-- Name: orders orders_order_status_id _fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_order_status_id _fk" FOREIGN KEY (order_status_id_fk) REFERENCES public.order_status(id);


--
-- Name: orders orders_organizations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_organizations_id_fk FOREIGN KEY (organization_id_fk) REFERENCES public.organizations(id);


--
-- Name: organizations_has_users organizations_has_users_organizations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations_has_users
    ADD CONSTRAINT organizations_has_users_organizations_id_fk FOREIGN KEY (organization_id_fk) REFERENCES public.organizations(id);


--
-- Name: organizations_has_users organizations_has_users_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations_has_users
    ADD CONSTRAINT organizations_has_users_users_id_fk FOREIGN KEY (user_id_fk) REFERENCES public.users(id);


--
-- Name: products products_nomenclature_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_nomenclature_id_fk FOREIGN KEY (nomenclature_id_fk) REFERENCES public.nomenclature(id);


--
-- Name: products products_orders_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_orders_id_fk FOREIGN KEY (order_id_fk) REFERENCES public.orders(id);


--
-- Name: products products_unit_measures_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_unit_measures_id_fk FOREIGN KEY (unit_measure_id_fk) REFERENCES public.unit_measures(id);


--
-- Name: products products_vat_rates_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_vat_rates_id_fk FOREIGN KEY (vat_rate_id_fk) REFERENCES public.vat_rates(id);


--
-- Name: products products_vat_rates_id_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_vat_rates_id_fk_2 FOREIGN KEY (vat_rate_id_fk) REFERENCES public.vat_rates(id);


--
-- Name: tokens tokens_user_devices_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_user_devices_id_fk FOREIGN KEY (user_device_id_fk) REFERENCES public.user_devices(id);


--
-- Name: tokens tokens_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_users_id_fk FOREIGN KEY (user_id_fk) REFERENCES public.users(id);


--
-- Name: users users_user_roles_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_roles_id_fk FOREIGN KEY (user_role_id_fk) REFERENCES public.user_roles(id);


--
-- PostgreSQL database dump complete
--

