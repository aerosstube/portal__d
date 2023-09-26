
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

INSERT INTO public.clients VALUES (33, '13128', 'dsfl;sdkfsd;lkf', ';ldfkgdl;fgksdf', 'dflkdkl', ';dlfkd;lfk', false);
INSERT INTO public.clients VALUES (35, '88861', 'test', 'test', 'test', 'test', false);
INSERT INTO public.clients VALUES (34, '49473', 'qwe', 'qwe', 'qwe', 'wqe', true);
INSERT INTO public.clients VALUES (36, '92851', 'test1', 'test1', 'test1', 'test1', false);


--
-- Data for Name: clients_has_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: counterparties; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: counterparty_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.counterparty_types VALUES (1, 'Юридическое лицо');
INSERT INTO public.counterparty_types VALUES (2, 'Физическое лицо');
INSERT INTO public.counterparty_types VALUES (3, 'Индивидуальный предприниматель');


--
-- Data for Name: nomenclature; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.nomenclature VALUES (8, '25544', 'lihjkkjhkjh', 'penis', 7, false);


--
-- Data for Name: order_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.order_status VALUES (1, 'К выполнению');
INSERT INTO public.order_status VALUES (2, 'Выполненно');


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders VALUES (10, '87558', '79687033141', '2023-07-14 12:28:15', 36, NULL, 'testing1', 2, 34, false);


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.organizations VALUES (36, '813884', 'ewqeqwe', 'rwerqweqw', 'wqeqwewqew', 'ewqeqwee', '6564452343', '324234234', false);


--
-- Data for Name: organizations_has_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products VALUES (46, 8, 7, 12312.000, 12321.00, 147145267.44, 3.00, 2, 14714526.74, 161859794.18, 10, false);
INSERT INTO public.products VALUES (47, 8, 7, 5435430.000, 435435.00, 2319440932809.00, 2.00, 4, 463888186561.80, 2783329119370.80, 10, false);


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tokens VALUES (28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkJ1a2hhbm92X0RfRCIsImxvZ2luIjoiYnVraGFub3YiLCJ1c2VySWQiOjIsInJvbGUiOiLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgCIsImlhdCI6MTY4NDE0OTc4NSwiZXhwIjoxNjg2NzQxNzg1fQ.xqEJvMYh7-euR3IDCCqEvBrjugx1GJAOtNUTTCx3KIQ', 28, 2, '2023-06-14 14:23:05.17');
INSERT INTO public.tokens VALUES (29, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkJ1a2hhbm92X0RfRCIsImxvZ2luIjoiYnVraGFub3YiLCJ1c2VySWQiOjIsInJvbGUiOiLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgCIsImlhdCI6MTY4NTA0MTI5MywiZXhwIjoxNjg3NjMzMjkzfQ.6DNoSkfHN8zXpeO-v4g7eOsIL5Fj3ubTWqj_2OIzJ28', 29, 2, '2023-06-14 14:23:21.967');
INSERT INTO public.tokens VALUES (25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkJ1a2hhbm92X0RfRCIsImxvZ2luIjoiYnVraGFub3YiLCJ1c2VySWQiOjIsInJvbGUiOiLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgCIsImlhdCI6MTY4NzM0MDk1NiwiZXhwIjoxNjg5OTMyOTU2fQ.TrDJAI_s8pANcEp6lgzM5K0Z_cb8w4gZiE91EDLfspg', 25, 2, '2023-05-20 08:46:06.865');
INSERT INTO public.tokens VALUES (30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkJ1a2hhbm92X0RhbmlsYV9EIiwibG9naW4iOiJidWtoYW5vdiIsInVzZXJJZCI6Miwicm9sZSI6ItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAIiwiaWF0IjoxNjg4NDY3MTE0LCJleHAiOjE2OTEwNTkxMTR9.u_DtF7Y7SjB4yp28DPWjTQTOx6obMmR5Id0OgxXcNfA', 30, 2, '2023-07-21 12:38:41.324');
INSERT INTO public.tokens VALUES (32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkJ1a2hhbm92X0RhbmlsYV9EIiwibG9naW4iOiJidWtoYW5vdiIsInVzZXJJZCI6Miwicm9sZSI6ItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAIiwiaWF0IjoxNjg5MTUwODk4LCJleHAiOjE2OTE3NDI4OTh9.XrxVCD_HNdaNurE0pCPpDHpPN7osKPhQ1-Se6bIMSno', 32, 2, '2023-08-11 11:34:58.099');
INSERT INTO public.tokens VALUES (31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkJ1a2hhbm92X0RhbmlsYV9EIiwibG9naW4iOiJidWtoYW5vdiIsInVzZXJJZCI6Miwicm9sZSI6ItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAIiwiaWF0IjoxNjkwMDE2OTM5LCJleHAiOjE2OTI2MDg5Mzl9.W81ELUaD98WlfX1FEmEXHqDMgDFGeOdYqKt4NEd45tA', 31, 2, '2023-07-21 12:46:51.794');


--
-- Data for Name: unit_measures; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.unit_measures VALUES (7, 'sdafsdaf', 'penis', false);


--
-- Data for Name: user_devices; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_devices VALUES (10, '{"isYaBrowser":false,"isAuthoritative":false,"isMobile":false,"isMobileNative":false,"isTablet":false,"isiPad":false,"isiPod":false,"isiPhone":false,"isiPhoneNative":false,"isAndroid":false,"isAndroidNative":false,"isBlackberry":false,"isOpera":false,"isIE":false,"isEdge":false,"isIECompatibilityMode":false,"isSafari":false,"isFirefox":false,"isWebkit":false,"isChrome":false,"isKonqueror":false,"isOmniWeb":false,"isSeaMonkey":false,"isFlock":false,"isAmaya":false,"isPhantomJS":false,"isEpiphany":false,"isDesktop":false,"isWindows":false,"isLinux":false,"isLinux64":false,"isMac":false,"isChromeOS":false,"isBada":false,"isSamsung":false,"isRaspberry":false,"isBot":"postman","isCurl":false,"isAndroidTablet":false,"isWinJs":false,"isKindleFire":false,"isSilk":false,"isCaptive":false,"isSmartTV":false,"isUC":false,"isFacebook":false,"isAlamoFire":false,"isElectron":false,"silkAccelerated":false,"browser":"PostmanRuntime","version":"7.31.3","os":"unknown","platform":"unknown","geoIp":{},"source":"PostmanRuntime/7.31.3","isWechat":false}', '::ffff:192.168.31.22');
INSERT INTO public.user_devices VALUES (25, '{"isYaBrowser":false,"isAuthoritative":false,"isMobile":false,"isMobileNative":false,"isTablet":false,"isiPad":false,"isiPod":false,"isiPhone":false,"isiPhoneNative":false,"isAndroid":false,"isAndroidNative":false,"isBlackberry":false,"isOpera":false,"isIE":false,"isEdge":false,"isIECompatibilityMode":false,"isSafari":false,"isFirefox":false,"isWebkit":false,"isChrome":false,"isKonqueror":false,"isOmniWeb":false,"isSeaMonkey":false,"isFlock":false,"isAmaya":false,"isPhantomJS":false,"isEpiphany":false,"isDesktop":false,"isWindows":false,"isLinux":false,"isLinux64":false,"isMac":false,"isChromeOS":false,"isBada":false,"isSamsung":false,"isRaspberry":false,"isBot":"postman","isCurl":false,"isAndroidTablet":false,"isWinJs":false,"isKindleFire":false,"isSilk":false,"isCaptive":false,"isSmartTV":false,"isUC":false,"isFacebook":false,"isAlamoFire":false,"isElectron":false,"silkAccelerated":false,"browser":"PostmanRuntime","version":"7.32.2","os":"unknown","platform":"unknown","geoIp":{},"source":"PostmanRuntime/7.32.2","isWechat":false}', '::1');
INSERT INTO public.user_devices VALUES (28, '{"isYaBrowser":false,"isAuthoritative":true,"isMobile":false,"isMobileNative":false,"isTablet":false,"isiPad":false,"isiPod":false,"isiPhone":false,"isiPhoneNative":false,"isAndroid":false,"isAndroidNative":false,"isBlackberry":false,"isOpera":false,"isIE":false,"isEdge":false,"isIECompatibilityMode":false,"isSafari":false,"isFirefox":false,"isWebkit":false,"isChrome":true,"isKonqueror":false,"isOmniWeb":false,"isSeaMonkey":false,"isFlock":false,"isAmaya":false,"isPhantomJS":false,"isEpiphany":false,"isDesktop":true,"isWindows":false,"isLinux":false,"isLinux64":false,"isMac":true,"isChromeOS":false,"isBada":false,"isSamsung":false,"isRaspberry":false,"isBot":false,"isCurl":false,"isAndroidTablet":false,"isWinJs":false,"isKindleFire":false,"isSilk":false,"isCaptive":false,"isSmartTV":false,"isUC":false,"isFacebook":false,"isAlamoFire":false,"isElectron":false,"silkAccelerated":false,"browser":"Chrome","version":"112.0.0.0","os":"OS X","platform":"Apple Mac","geoIp":{},"source":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36","isWechat":false}', '::1');
INSERT INTO public.user_devices VALUES (29, '{"isYaBrowser":false,"isAuthoritative":true,"isMobile":false,"isMobileNative":false,"isTablet":false,"isiPad":false,"isiPod":false,"isiPhone":false,"isiPhoneNative":false,"isAndroid":false,"isAndroidNative":false,"isBlackberry":false,"isOpera":false,"isIE":false,"isEdge":false,"isIECompatibilityMode":false,"isSafari":false,"isFirefox":false,"isWebkit":false,"isChrome":true,"isKonqueror":false,"isOmniWeb":false,"isSeaMonkey":false,"isFlock":false,"isAmaya":false,"isPhantomJS":false,"isEpiphany":false,"isDesktop":true,"isWindows":false,"isLinux":false,"isLinux64":false,"isMac":true,"isChromeOS":false,"isBada":false,"isSamsung":false,"isRaspberry":false,"isBot":false,"isCurl":false,"isAndroidTablet":false,"isWinJs":false,"isKindleFire":false,"isSilk":false,"isCaptive":false,"isSmartTV":false,"isUC":false,"isFacebook":false,"isAlamoFire":false,"isElectron":false,"silkAccelerated":false,"browser":"Chrome","version":"113.0.0.0","os":"OS X","platform":"Apple Mac","geoIp":{},"source":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36","isWechat":false}', '::1');
INSERT INTO public.user_devices VALUES (30, '{"isYaBrowser":false,"isAuthoritative":true,"isMobile":false,"isMobileNative":false,"isTablet":false,"isiPad":false,"isiPod":false,"isiPhone":false,"isiPhoneNative":false,"isAndroid":false,"isAndroidNative":false,"isBlackberry":false,"isOpera":false,"isIE":false,"isEdge":false,"isIECompatibilityMode":false,"isSafari":false,"isFirefox":false,"isWebkit":false,"isChrome":true,"isKonqueror":false,"isOmniWeb":false,"isSeaMonkey":false,"isFlock":false,"isAmaya":false,"isPhantomJS":false,"isEpiphany":false,"isDesktop":true,"isWindows":false,"isLinux":false,"isLinux64":false,"isMac":true,"isChromeOS":false,"isBada":false,"isSamsung":false,"isRaspberry":false,"isBot":false,"isCurl":false,"isAndroidTablet":false,"isWinJs":false,"isKindleFire":false,"isSilk":false,"isCaptive":false,"isSmartTV":false,"isUC":false,"isFacebook":false,"isAlamoFire":false,"isElectron":false,"silkAccelerated":false,"browser":"Chrome","version":"114.0.0.0","os":"OS X","platform":"Apple Mac","geoIp":{},"source":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36","isWechat":false}', '::1');
INSERT INTO public.user_devices VALUES (31, '{"isYaBrowser":false,"isAuthoritative":true,"isMobile":false,"isMobileNative":false,"isTablet":false,"isiPad":false,"isiPod":false,"isiPhone":false,"isiPhoneNative":false,"isAndroid":false,"isAndroidNative":false,"isBlackberry":false,"isOpera":false,"isIE":false,"isEdge":false,"isIECompatibilityMode":false,"isSafari":false,"isFirefox":false,"isWebkit":false,"isChrome":true,"isKonqueror":false,"isOmniWeb":false,"isSeaMonkey":false,"isFlock":false,"isAmaya":false,"isPhantomJS":false,"isEpiphany":false,"isDesktop":true,"isWindows":false,"isLinux":true,"isLinux64":true,"isMac":false,"isChromeOS":false,"isBada":false,"isSamsung":false,"isRaspberry":false,"isBot":false,"isCurl":false,"isAndroidTablet":false,"isWinJs":false,"isKindleFire":false,"isSilk":false,"isCaptive":false,"isSmartTV":false,"isUC":false,"isFacebook":false,"isAlamoFire":false,"isElectron":false,"silkAccelerated":false,"browser":"Chrome","version":"109.0.0.0","os":"Linux 64","platform":"Linux","geoIp":{},"source":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36","isWechat":false}', '::1');
INSERT INTO public.user_devices VALUES (32, '{"isYaBrowser":false,"isAuthoritative":false,"isMobile":false,"isMobileNative":false,"isTablet":false,"isiPad":false,"isiPod":false,"isiPhone":false,"isiPhoneNative":false,"isAndroid":false,"isAndroidNative":false,"isBlackberry":false,"isOpera":false,"isIE":false,"isEdge":false,"isIECompatibilityMode":false,"isSafari":false,"isFirefox":false,"isWebkit":false,"isChrome":false,"isKonqueror":false,"isOmniWeb":false,"isSeaMonkey":false,"isFlock":false,"isAmaya":false,"isPhantomJS":false,"isEpiphany":false,"isDesktop":false,"isWindows":false,"isLinux":false,"isLinux64":false,"isMac":false,"isChromeOS":false,"isBada":false,"isSamsung":false,"isRaspberry":false,"isBot":"postman","isCurl":false,"isAndroidTablet":false,"isWinJs":false,"isKindleFire":false,"isSilk":false,"isCaptive":false,"isSmartTV":false,"isUC":false,"isFacebook":false,"isAlamoFire":false,"isElectron":false,"silkAccelerated":false,"browser":"PostmanRuntime","version":"7.32.3","os":"unknown","platform":"unknown","geoIp":{},"source":"PostmanRuntime/7.32.3","isWechat":false}', '::1');


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_roles VALUES (1, 'Администратор');
INSERT INTO public.user_roles VALUES (2, 'Менеджер');
INSERT INTO public.user_roles VALUES (3, 'Диллер');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (2, '2', 'bukhanov', 'bukhanov@gmail.com', 'Bukhanov_Danila_D', 1, '1234');


--
-- Data for Name: vat_rates; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.vat_rates VALUES (1, 0);
INSERT INTO public.vat_rates VALUES (2, 10);
INSERT INTO public.vat_rates VALUES (3, 18);
INSERT INTO public.vat_rates VALUES (4, 20);


--
-- Name: clients_has_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_has_users_id_seq', 15, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_seq', 36, true);


--
-- Name: counterparties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.counterparties_id_seq', 46, true);


--
-- Name: counterparty_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.counterparty_types_id_seq', 3, true);


--
-- Name: nomenclature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nomenclature_id_seq', 11, true);


--
-- Name: order_types_id _seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."order_types_id _seq"', 2, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 12, true);


--
-- Name: organizations_has_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organizations_has_users_id_seq', 11, true);


--
-- Name: organizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organizations_id_seq', 38, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 67, true);


--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_id_seq', 32, true);


--
-- Name: unit_measures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.unit_measures_id_seq', 14, true);


--
-- Name: user_devices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_devices_id_seq', 32, true);


--
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_roles_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 38, true);


--
-- Name: vat_rates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vat_rates_id_seq', 4, true);


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

