PGDMP      6                }         	   GESTDEPBD    16.4    16.4 �               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16741 	   GESTDEPBD    DATABASE     ~   CREATE DATABASE "GESTDEPBD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "GESTDEPBD";
                angela    false            �           1247    17462    position_type    TYPE     j   CREATE TYPE public.position_type AS ENUM (
    'delantero',
    'lateral',
    'arquero',
    'ultimo'
);
     DROP TYPE public.position_type;
       public          angela    false            �           1247    17351 	   positions    TYPE     g   CREATE TYPE public.positions AS ENUM (
    'Portero',
    'Delantero',
    'Defensa',
    'Lateral'
);
    DROP TYPE public.positions;
       public          angela    false            �            1259    16752    admins    TABLE        CREATE TABLE public.admins (
    id_admin integer NOT NULL,
    id_user integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    email character varying(255),
    password character varying(10)
);
    DROP TABLE public.admins;
       public         heap    angela    false            �            1259    16751    admin_id_admin_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_id_admin_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.admin_id_admin_seq;
       public          angela    false    216                       0    0    admin_id_admin_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.admin_id_admin_seq OWNED BY public.admins.id_admin;
          public          angela    false    215            �            1259    16761    cards    TABLE     �   CREATE TABLE public.cards (
    card_id integer NOT NULL,
    card_color character varying(10),
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.cards;
       public         heap    angela    false            �            1259    16760    card_card_id_seq    SEQUENCE     �   CREATE SEQUENCE public.card_card_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.card_card_id_seq;
       public          angela    false    218                       0    0    card_card_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.card_card_id_seq OWNED BY public.cards.card_id;
          public          angela    false    217            �            1259    16770 
   categories    TABLE        CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_name character varying(30),
    team_id integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    group_id integer
);
    DROP TABLE public.categories;
       public         heap    angela    false            �            1259    16769    category_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.category_category_id_seq;
       public          angela    false    220                       0    0    category_category_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.category_category_id_seq OWNED BY public.categories.category_id;
          public          angela    false    219            �            1259    16779    champion_games    TABLE     �   CREATE TABLE public.champion_games (
    id_c integer NOT NULL,
    game_id integer,
    championship_id integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 "   DROP TABLE public.champion_games;
       public         heap    angela    false            �            1259    16778    champion_game_id_c_seq    SEQUENCE     �   CREATE SEQUENCE public.champion_game_id_c_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.champion_game_id_c_seq;
       public          angela    false    222                       0    0    champion_game_id_c_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.champion_game_id_c_seq OWNED BY public.champion_games.id_c;
          public          angela    false    221            �            1259    16788    champion_teams    TABLE     �   CREATE TABLE public.champion_teams (
    id integer NOT NULL,
    team_id integer,
    championship_id integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 "   DROP TABLE public.champion_teams;
       public         heap    angela    false            �            1259    16787    champion_team_id_seq    SEQUENCE     �   CREATE SEQUENCE public.champion_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.champion_team_id_seq;
       public          angela    false    224                       0    0    champion_team_id_seq    SEQUENCE OWNED BY     N   ALTER SEQUENCE public.champion_team_id_seq OWNED BY public.champion_teams.id;
          public          angela    false    223            �            1259    16797    championships    TABLE     �  CREATE TABLE public.championships (
    championship_id integer NOT NULL,
    championship_name character varying(30),
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    start_inscriptions timestamp without time zone,
    end_inscriptions timestamp without time zone,
    group_id integer,
    category_id integer
);
 !   DROP TABLE public.championships;
       public         heap    angela    false            �            1259    16796     championship_championship_id_seq    SEQUENCE     �   CREATE SEQUENCE public.championship_championship_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.championship_championship_id_seq;
       public          angela    false    226                       0    0     championship_championship_id_seq    SEQUENCE OWNED BY     f   ALTER SEQUENCE public.championship_championship_id_seq OWNED BY public.championships.championship_id;
          public          angela    false    225            �            1259    16808    chronologies    TABLE       CREATE TABLE public.chronologies (
    id_chronology integer NOT NULL,
    card_id integer,
    game_id integer,
    goal_number integer,
    g_id integer,
    id_player integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
     DROP TABLE public.chronologies;
       public         heap    angela    false            �            1259    16807    chronology_id_chronology_seq    SEQUENCE     �   CREATE SEQUENCE public.chronology_id_chronology_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.chronology_id_chronology_seq;
       public          angela    false    228                       0    0    chronology_id_chronology_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.chronology_id_chronology_seq OWNED BY public.chronologies.id_chronology;
          public          angela    false    227            �            1259    16817    games    TABLE     (  CREATE TABLE public.games (
    game_id integer NOT NULL,
    game_date date,
    start_time time without time zone,
    end_time time without time zone,
    location character varying(255),
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.games;
       public         heap    angela    false            �            1259    16816    game_game_id_seq    SEQUENCE     �   CREATE SEQUENCE public.game_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.game_game_id_seq;
       public          angela    false    230                       0    0    game_game_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.game_game_id_seq OWNED BY public.games.game_id;
          public          angela    false    229            �            1259    16826    game_referees    TABLE     �   CREATE TABLE public.game_referees (
    id_game_referee integer NOT NULL,
    id_referee integer,
    game_id integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 !   DROP TABLE public.game_referees;
       public         heap    angela    false            �            1259    16825     game_referee_id_game_referee_seq    SEQUENCE     �   CREATE SEQUENCE public.game_referee_id_game_referee_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.game_referee_id_game_referee_seq;
       public          angela    false    232                        0    0     game_referee_id_game_referee_seq    SEQUENCE OWNED BY     f   ALTER SEQUENCE public.game_referee_id_game_referee_seq OWNED BY public.game_referees.id_game_referee;
          public          angela    false    231            �            1259    16835    group    TABLE     �   CREATE TABLE public."group" (
    group_id integer NOT NULL,
    group_name character varying(60),
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public."group";
       public         heap    angela    false            �            1259    16834    group_group_id_seq    SEQUENCE     �   CREATE SEQUENCE public.group_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.group_group_id_seq;
       public          angela    false    234            !           0    0    group_group_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.group_group_id_seq OWNED BY public."group".group_id;
          public          angela    false    233            �            1259    16953    payment    TABLE     j  CREATE TABLE public.payment (
    payment_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    payment_date date NOT NULL,
    status character varying(20) DEFAULT 'Pending'::character varying,
    reservation_id integer,
    status_p boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_treasurer integer
);
    DROP TABLE public.payment;
       public         heap    angela    false                       1259    17448    payment_details    TABLE     �   CREATE TABLE public.payment_details (
    id_detail_payment integer NOT NULL,
    payment_id integer NOT NULL,
    amount_paid numeric(10,2) NOT NULL,
    total numeric(10,2) NOT NULL
);
 #   DROP TABLE public.payment_details;
       public         heap    angela    false                        1259    17447 %   payment_details_id_detail_payment_seq    SEQUENCE     �   CREATE SEQUENCE public.payment_details_id_detail_payment_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.payment_details_id_detail_payment_seq;
       public          angela    false    257            "           0    0 %   payment_details_id_detail_payment_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.payment_details_id_detail_payment_seq OWNED BY public.payment_details.id_detail_payment;
          public          angela    false    256            �            1259    16952    payment_payment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payment_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.payment_payment_id_seq;
       public          angela    false    253            #           0    0    payment_payment_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.payment_payment_id_seq OWNED BY public.payment.payment_id;
          public          angela    false    252            �            1259    16844    phases    TABLE     �   CREATE TABLE public.phases (
    phase_id integer NOT NULL,
    phase_name character varying(60),
    championship_id integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.phases;
       public         heap    angela    false            �            1259    16843    phases_phase_id_seq    SEQUENCE     �   CREATE SEQUENCE public.phases_phase_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.phases_phase_id_seq;
       public          angela    false    236            $           0    0    phases_phase_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.phases_phase_id_seq OWNED BY public.phases.phase_id;
          public          angela    false    235            �            1259    16853    players    TABLE     5  CREATE TABLE public.players (
    id_player integer NOT NULL,
    id_card character varying(10),
    firstname character varying(20),
    lastname character varying(20),
    date_of_birth date,
    photo bytea,
    gen character(1),
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    type_position character varying(20),
    id_shirt integer,
    CONSTRAINT players_type_position_check CHECK ((lower((type_position)::text) = ANY (ARRAY['portero'::text, 'lateral'::text, 'defensa'::text, 'pivote'::text])))
);
    DROP TABLE public.players;
       public         heap    angela    false            �            1259    16852    player_id_player_seq    SEQUENCE     �   CREATE SEQUENCE public.player_id_player_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.player_id_player_seq;
       public          angela    false    238            %           0    0    player_id_player_seq    SEQUENCE OWNED BY     N   ALTER SEQUENCE public.player_id_player_seq OWNED BY public.players.id_player;
          public          angela    false    237            �            1259    16862    referees    TABLE     \  CREATE TABLE public.referees (
    id_referee integer NOT NULL,
    firstname character varying(30),
    lastname character varying(30),
    id_card character varying(30),
    photo bytea,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    gen character varying(1),
    date_of_birth date
);
    DROP TABLE public.referees;
       public         heap    angela    false            �            1259    16861    referee_id_referee_seq    SEQUENCE     �   CREATE SEQUENCE public.referee_id_referee_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.referee_id_referee_seq;
       public          angela    false    240            &           0    0    referee_id_referee_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.referee_id_referee_seq OWNED BY public.referees.id_referee;
          public          angela    false    239            �            1259    16871    referee_reports    TABLE     �   CREATE TABLE public.referee_reports (
    id integer NOT NULL,
    id_referee integer,
    report_id integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 #   DROP TABLE public.referee_reports;
       public         heap    angela    false            �            1259    16870    referee_report_id_seq    SEQUENCE     �   CREATE SEQUENCE public.referee_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.referee_report_id_seq;
       public          angela    false    242            '           0    0    referee_report_id_seq    SEQUENCE OWNED BY     P   ALTER SEQUENCE public.referee_report_id_seq OWNED BY public.referee_reports.id;
          public          angela    false    241                       1259    17459    reports_report_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.reports_report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reports_report_id_seq;
       public          angela    false            �            1259    16880    reports    TABLE       CREATE TABLE public.reports (
    report_id integer DEFAULT nextval('public.reports_report_id_seq'::regclass) NOT NULL,
    description text,
    game_id integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.reports;
       public         heap    angela    false    258            �            1259    16879    report_report_id_seq    SEQUENCE     �   CREATE SEQUENCE public.report_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.report_report_id_seq;
       public          angela    false    244            (           0    0    report_report_id_seq    SEQUENCE OWNED BY     N   ALTER SEQUENCE public.report_report_id_seq OWNED BY public.reports.report_id;
          public          angela    false    243                       1259    17582    shirt_colors    TABLE     �   CREATE TABLE public.shirt_colors (
    id_scolor integer NOT NULL,
    codigo_hex character varying(7) NOT NULL,
    nombre character varying(50)
);
     DROP TABLE public.shirt_colors;
       public         heap    angela    false                       1259    17581    shirt_colors_id_scolor_seq    SEQUENCE     �   CREATE SEQUENCE public.shirt_colors_id_scolor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.shirt_colors_id_scolor_seq;
       public          angela    false    260            )           0    0    shirt_colors_id_scolor_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.shirt_colors_id_scolor_seq OWNED BY public.shirt_colors.id_scolor;
          public          angela    false    259            �            1259    16899    team_players    TABLE     �   CREATE TABLE public.team_players (
    id_player integer NOT NULL,
    team_id integer NOT NULL,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
     DROP TABLE public.team_players;
       public         heap    angela    false            �            1259    16891    teams    TABLE     >  CREATE TABLE public.teams (
    team_id integer NOT NULL,
    team_name character varying(30),
    id_td integer NOT NULL,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_treasurer integer,
    color_primario_id integer,
    color_secundario_id integer
);
    DROP TABLE public.teams;
       public         heap    angela    false            �            1259    16890    team_team_id_seq    SEQUENCE     �   CREATE SEQUENCE public.team_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.team_team_id_seq;
       public          angela    false    246            *           0    0    team_team_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.team_team_id_seq OWNED BY public.teams.team_id;
          public          angela    false    245            �            1259    16907    technical_directors    TABLE     �   CREATE TABLE public.technical_directors (
    id_td integer NOT NULL,
    id_user integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 '   DROP TABLE public.technical_directors;
       public         heap    angela    false            �            1259    16906    technical_director_id_td_seq    SEQUENCE     �   CREATE SEQUENCE public.technical_director_id_td_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.technical_director_id_td_seq;
       public          angela    false    249            +           0    0    technical_director_id_td_seq    SEQUENCE OWNED BY     ^   ALTER SEQUENCE public.technical_director_id_td_seq OWNED BY public.technical_directors.id_td;
          public          angela    false    248            �            1259    17378 
   treasurers    TABLE     �   CREATE TABLE public.treasurers (
    id_treasurer integer NOT NULL,
    id_user integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.treasurers;
       public         heap    angela    false            �            1259    17377    treasurer_id_treasurer_seq    SEQUENCE     �   CREATE SEQUENCE public.treasurer_id_treasurer_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.treasurer_id_treasurer_seq;
       public          angela    false    255            ,           0    0    treasurer_id_treasurer_seq    SEQUENCE OWNED BY     Z   ALTER SEQUENCE public.treasurer_id_treasurer_seq OWNED BY public.treasurers.id_treasurer;
          public          angela    false    254            �            1259    16916    users    TABLE     �  CREATE TABLE public.users (
    id_user integer NOT NULL,
    firstname character varying(30),
    lastname character varying(30),
    id_card character varying(8),
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    gen character(1),
    date_of_birth date,
    photo bytea,
    CONSTRAINT users_gender_check CHECK ((gen = ANY (ARRAY['F'::bpchar, 'M'::bpchar])))
);
    DROP TABLE public.users;
       public         heap    angela    false            �            1259    16915    user_id_user_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_id_user_seq;
       public          angela    false    251            -           0    0    user_id_user_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.user_id_user_seq OWNED BY public.users.id_user;
          public          angela    false    250            �           2604    16755    admins id_admin    DEFAULT     q   ALTER TABLE ONLY public.admins ALTER COLUMN id_admin SET DEFAULT nextval('public.admin_id_admin_seq'::regclass);
 >   ALTER TABLE public.admins ALTER COLUMN id_admin DROP DEFAULT;
       public          angela    false    215    216    216            �           2604    16764    cards card_id    DEFAULT     m   ALTER TABLE ONLY public.cards ALTER COLUMN card_id SET DEFAULT nextval('public.card_card_id_seq'::regclass);
 <   ALTER TABLE public.cards ALTER COLUMN card_id DROP DEFAULT;
       public          angela    false    218    217    218            �           2604    16773    categories category_id    DEFAULT     ~   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          angela    false    220    219    220            �           2604    16782    champion_games id_c    DEFAULT     y   ALTER TABLE ONLY public.champion_games ALTER COLUMN id_c SET DEFAULT nextval('public.champion_game_id_c_seq'::regclass);
 B   ALTER TABLE public.champion_games ALTER COLUMN id_c DROP DEFAULT;
       public          angela    false    222    221    222            �           2604    16791    champion_teams id    DEFAULT     u   ALTER TABLE ONLY public.champion_teams ALTER COLUMN id SET DEFAULT nextval('public.champion_team_id_seq'::regclass);
 @   ALTER TABLE public.champion_teams ALTER COLUMN id DROP DEFAULT;
       public          angela    false    223    224    224            �           2604    16800    championships championship_id    DEFAULT     �   ALTER TABLE ONLY public.championships ALTER COLUMN championship_id SET DEFAULT nextval('public.championship_championship_id_seq'::regclass);
 L   ALTER TABLE public.championships ALTER COLUMN championship_id DROP DEFAULT;
       public          angela    false    225    226    226            �           2604    16811    chronologies id_chronology    DEFAULT     �   ALTER TABLE ONLY public.chronologies ALTER COLUMN id_chronology SET DEFAULT nextval('public.chronology_id_chronology_seq'::regclass);
 I   ALTER TABLE public.chronologies ALTER COLUMN id_chronology DROP DEFAULT;
       public          angela    false    228    227    228            �           2604    16829    game_referees id_game_referee    DEFAULT     �   ALTER TABLE ONLY public.game_referees ALTER COLUMN id_game_referee SET DEFAULT nextval('public.game_referee_id_game_referee_seq'::regclass);
 L   ALTER TABLE public.game_referees ALTER COLUMN id_game_referee DROP DEFAULT;
       public          angela    false    231    232    232            �           2604    16820    games game_id    DEFAULT     m   ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.game_game_id_seq'::regclass);
 <   ALTER TABLE public.games ALTER COLUMN game_id DROP DEFAULT;
       public          angela    false    230    229    230            �           2604    16838    group group_id    DEFAULT     r   ALTER TABLE ONLY public."group" ALTER COLUMN group_id SET DEFAULT nextval('public.group_group_id_seq'::regclass);
 ?   ALTER TABLE public."group" ALTER COLUMN group_id DROP DEFAULT;
       public          angela    false    233    234    234            �           2604    16956    payment payment_id    DEFAULT     x   ALTER TABLE ONLY public.payment ALTER COLUMN payment_id SET DEFAULT nextval('public.payment_payment_id_seq'::regclass);
 A   ALTER TABLE public.payment ALTER COLUMN payment_id DROP DEFAULT;
       public          angela    false    252    253    253                       2604    17451 !   payment_details id_detail_payment    DEFAULT     �   ALTER TABLE ONLY public.payment_details ALTER COLUMN id_detail_payment SET DEFAULT nextval('public.payment_details_id_detail_payment_seq'::regclass);
 P   ALTER TABLE public.payment_details ALTER COLUMN id_detail_payment DROP DEFAULT;
       public          angela    false    257    256    257            �           2604    16847    phases phase_id    DEFAULT     r   ALTER TABLE ONLY public.phases ALTER COLUMN phase_id SET DEFAULT nextval('public.phases_phase_id_seq'::regclass);
 >   ALTER TABLE public.phases ALTER COLUMN phase_id DROP DEFAULT;
       public          angela    false    236    235    236            �           2604    16856    players id_player    DEFAULT     u   ALTER TABLE ONLY public.players ALTER COLUMN id_player SET DEFAULT nextval('public.player_id_player_seq'::regclass);
 @   ALTER TABLE public.players ALTER COLUMN id_player DROP DEFAULT;
       public          angela    false    238    237    238            �           2604    16874    referee_reports id    DEFAULT     w   ALTER TABLE ONLY public.referee_reports ALTER COLUMN id SET DEFAULT nextval('public.referee_report_id_seq'::regclass);
 A   ALTER TABLE public.referee_reports ALTER COLUMN id DROP DEFAULT;
       public          angela    false    242    241    242            �           2604    16865    referees id_referee    DEFAULT     y   ALTER TABLE ONLY public.referees ALTER COLUMN id_referee SET DEFAULT nextval('public.referee_id_referee_seq'::regclass);
 B   ALTER TABLE public.referees ALTER COLUMN id_referee DROP DEFAULT;
       public          angela    false    240    239    240                       2604    17585    shirt_colors id_scolor    DEFAULT     �   ALTER TABLE ONLY public.shirt_colors ALTER COLUMN id_scolor SET DEFAULT nextval('public.shirt_colors_id_scolor_seq'::regclass);
 E   ALTER TABLE public.shirt_colors ALTER COLUMN id_scolor DROP DEFAULT;
       public          angela    false    260    259    260            �           2604    16894    teams team_id    DEFAULT     m   ALTER TABLE ONLY public.teams ALTER COLUMN team_id SET DEFAULT nextval('public.team_team_id_seq'::regclass);
 <   ALTER TABLE public.teams ALTER COLUMN team_id DROP DEFAULT;
       public          angela    false    246    245    246            �           2604    16910    technical_directors id_td    DEFAULT     �   ALTER TABLE ONLY public.technical_directors ALTER COLUMN id_td SET DEFAULT nextval('public.technical_director_id_td_seq'::regclass);
 H   ALTER TABLE public.technical_directors ALTER COLUMN id_td DROP DEFAULT;
       public          angela    false    249    248    249                        2604    17381    treasurers id_treasurer    DEFAULT     �   ALTER TABLE ONLY public.treasurers ALTER COLUMN id_treasurer SET DEFAULT nextval('public.treasurer_id_treasurer_seq'::regclass);
 F   ALTER TABLE public.treasurers ALTER COLUMN id_treasurer DROP DEFAULT;
       public          angela    false    255    254    255            �           2604    16919    users id_user    DEFAULT     m   ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.user_id_user_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN id_user DROP DEFAULT;
       public          angela    false    251    250    251            �          0    16752    admins 
   TABLE DATA           X   COPY public.admins (id_admin, id_user, status, created_at, email, password) FROM stdin;
    public          angela    false    216   �       �          0    16761    cards 
   TABLE DATA           H   COPY public.cards (card_id, card_color, status, created_at) FROM stdin;
    public          angela    false    218   )�       �          0    16770 
   categories 
   TABLE DATA           g   COPY public.categories (category_id, category_name, team_id, status, created_at, group_id) FROM stdin;
    public          angela    false    220   ��       �          0    16779    champion_games 
   TABLE DATA           \   COPY public.champion_games (id_c, game_id, championship_id, status, created_at) FROM stdin;
    public          angela    false    222   �       �          0    16788    champion_teams 
   TABLE DATA           Z   COPY public.champion_teams (id, team_id, championship_id, status, created_at) FROM stdin;
    public          angela    false    224   ��       �          0    16797    championships 
   TABLE DATA           �   COPY public.championships (championship_id, championship_name, status, created_at, start_date, end_date, start_inscriptions, end_inscriptions, group_id, category_id) FROM stdin;
    public          angela    false    226   ��       �          0    16808    chronologies 
   TABLE DATA           y   COPY public.chronologies (id_chronology, card_id, game_id, goal_number, g_id, id_player, status, created_at) FROM stdin;
    public          angela    false    228   ��       �          0    16826    game_referees 
   TABLE DATA           a   COPY public.game_referees (id_game_referee, id_referee, game_id, status, created_at) FROM stdin;
    public          angela    false    232   �       �          0    16817    games 
   TABLE DATA           g   COPY public.games (game_id, game_date, start_time, end_time, location, status, created_at) FROM stdin;
    public          angela    false    230   t�       �          0    16835    group 
   TABLE DATA           K   COPY public."group" (group_id, group_name, status, created_at) FROM stdin;
    public          angela    false    234   �       
          0    16953    payment 
   TABLE DATA              COPY public.payment (payment_id, amount, payment_date, status, reservation_id, status_p, created_at, id_treasurer) FROM stdin;
    public          angela    false    253   9�                 0    17448    payment_details 
   TABLE DATA           \   COPY public.payment_details (id_detail_payment, payment_id, amount_paid, total) FROM stdin;
    public          angela    false    257   V�       �          0    16844    phases 
   TABLE DATA           [   COPY public.phases (phase_id, phase_name, championship_id, status, created_at) FROM stdin;
    public          angela    false    236   s�       �          0    16853    players 
   TABLE DATA           �   COPY public.players (id_player, id_card, firstname, lastname, date_of_birth, photo, gen, status, created_at, type_position, id_shirt) FROM stdin;
    public          angela    false    238   ��       �          0    16871    referee_reports 
   TABLE DATA           X   COPY public.referee_reports (id, id_referee, report_id, status, created_at) FROM stdin;
    public          angela    false    242   \�       �          0    16862    referees 
   TABLE DATA           {   COPY public.referees (id_referee, firstname, lastname, id_card, photo, status, created_at, gen, date_of_birth) FROM stdin;
    public          angela    false    240   ��                 0    16880    reports 
   TABLE DATA           V   COPY public.reports (report_id, description, game_id, status, created_at) FROM stdin;
    public          angela    false    244   L�                 0    17582    shirt_colors 
   TABLE DATA           E   COPY public.shirt_colors (id_scolor, codigo_hex, nombre) FROM stdin;
    public          angela    false    260   b�                 0    16899    team_players 
   TABLE DATA           N   COPY public.team_players (id_player, team_id, status, created_at) FROM stdin;
    public          angela    false    247   ��                 0    16891    teams 
   TABLE DATA           �   COPY public.teams (team_id, team_name, id_td, status, created_at, id_treasurer, color_primario_id, color_secundario_id) FROM stdin;
    public          angela    false    246   ��                 0    16907    technical_directors 
   TABLE DATA           Q   COPY public.technical_directors (id_td, id_user, status, created_at) FROM stdin;
    public          angela    false    249   V�                 0    17378 
   treasurers 
   TABLE DATA           O   COPY public.treasurers (id_treasurer, id_user, status, created_at) FROM stdin;
    public          angela    false    255   ��                 0    16916    users 
   TABLE DATA           u   COPY public.users (id_user, firstname, lastname, id_card, status, created_at, gen, date_of_birth, photo) FROM stdin;
    public          angela    false    251   �       .           0    0    admin_id_admin_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.admin_id_admin_seq', 7, true);
          public          angela    false    215            /           0    0    card_card_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.card_card_id_seq', 15, true);
          public          angela    false    217            0           0    0    category_category_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.category_category_id_seq', 10, true);
          public          angela    false    219            1           0    0    champion_game_id_c_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.champion_game_id_c_seq', 20, true);
          public          angela    false    221            2           0    0    champion_team_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.champion_team_id_seq', 25, true);
          public          angela    false    223            3           0    0     championship_championship_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.championship_championship_id_seq', 12, true);
          public          angela    false    225            4           0    0    chronology_id_chronology_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.chronology_id_chronology_seq', 10, true);
          public          angela    false    227            5           0    0    game_game_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.game_game_id_seq', 15, true);
          public          angela    false    229            6           0    0     game_referee_id_game_referee_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.game_referee_id_game_referee_seq', 15, true);
          public          angela    false    231            7           0    0    group_group_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.group_group_id_seq', 1, false);
          public          angela    false    233            8           0    0 %   payment_details_id_detail_payment_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.payment_details_id_detail_payment_seq', 44, true);
          public          angela    false    256            9           0    0    payment_payment_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.payment_payment_id_seq', 45, true);
          public          angela    false    252            :           0    0    phases_phase_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.phases_phase_id_seq', 1, false);
          public          angela    false    235            ;           0    0    player_id_player_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.player_id_player_seq', 38, true);
          public          angela    false    237            <           0    0    referee_id_referee_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.referee_id_referee_seq', 21, true);
          public          angela    false    239            =           0    0    referee_report_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.referee_report_id_seq', 15, true);
          public          angela    false    241            >           0    0    report_report_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.report_report_id_seq', 3, true);
          public          angela    false    243            ?           0    0    reports_report_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.reports_report_id_seq', 7, true);
          public          angela    false    258            @           0    0    shirt_colors_id_scolor_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.shirt_colors_id_scolor_seq', 46, true);
          public          angela    false    259            A           0    0    team_team_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.team_team_id_seq', 18, true);
          public          angela    false    245            B           0    0    technical_director_id_td_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.technical_director_id_td_seq', 30, true);
          public          angela    false    248            C           0    0    treasurer_id_treasurer_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.treasurer_id_treasurer_seq', 7, true);
          public          angela    false    254            D           0    0    user_id_user_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_id_user_seq', 30, true);
          public          angela    false    250                       2606    16759    admins admin_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id_admin);
 ;   ALTER TABLE ONLY public.admins DROP CONSTRAINT admin_pkey;
       public            angela    false    216            
           2606    17544    admins admins_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key UNIQUE (email);
 A   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_email_key;
       public            angela    false    216                       2606    16768    cards card_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.cards
    ADD CONSTRAINT card_pkey PRIMARY KEY (card_id);
 9   ALTER TABLE ONLY public.cards DROP CONSTRAINT card_pkey;
       public            angela    false    218                       2606    16777    categories category_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);
 B   ALTER TABLE ONLY public.categories DROP CONSTRAINT category_pkey;
       public            angela    false    220                       2606    16786 !   champion_games champion_game_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.champion_games
    ADD CONSTRAINT champion_game_pkey PRIMARY KEY (id_c);
 K   ALTER TABLE ONLY public.champion_games DROP CONSTRAINT champion_game_pkey;
       public            angela    false    222                       2606    16795 !   champion_teams champion_team_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.champion_teams
    ADD CONSTRAINT champion_team_pkey PRIMARY KEY (id);
 K   ALTER TABLE ONLY public.champion_teams DROP CONSTRAINT champion_team_pkey;
       public            angela    false    224                       2606    16806    championships championship_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.championships
    ADD CONSTRAINT championship_pkey PRIMARY KEY (championship_id);
 I   ALTER TABLE ONLY public.championships DROP CONSTRAINT championship_pkey;
       public            angela    false    226                       2606    16815    chronologies chronology_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.chronologies
    ADD CONSTRAINT chronology_pkey PRIMARY KEY (id_chronology);
 F   ALTER TABLE ONLY public.chronologies DROP CONSTRAINT chronology_pkey;
       public            angela    false    228                       2606    16824    games game_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.games
    ADD CONSTRAINT game_pkey PRIMARY KEY (game_id);
 9   ALTER TABLE ONLY public.games DROP CONSTRAINT game_pkey;
       public            angela    false    230                       2606    16833    game_referees game_referee_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.game_referees
    ADD CONSTRAINT game_referee_pkey PRIMARY KEY (id_game_referee);
 I   ALTER TABLE ONLY public.game_referees DROP CONSTRAINT game_referee_pkey;
       public            angela    false    232                       2606    16842    group group_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (group_id);
 <   ALTER TABLE ONLY public."group" DROP CONSTRAINT group_pkey;
       public            angela    false    234            6           2606    17453 $   payment_details payment_details_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.payment_details
    ADD CONSTRAINT payment_details_pkey PRIMARY KEY (id_detail_payment);
 N   ALTER TABLE ONLY public.payment_details DROP CONSTRAINT payment_details_pkey;
       public            angela    false    257            2           2606    16961    payment payment_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (payment_id);
 >   ALTER TABLE ONLY public.payment DROP CONSTRAINT payment_pkey;
       public            angela    false    253                       2606    16851    phases phases_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.phases
    ADD CONSTRAINT phases_pkey PRIMARY KEY (phase_id);
 <   ALTER TABLE ONLY public.phases DROP CONSTRAINT phases_pkey;
       public            angela    false    236                        2606    16860    players player_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.players
    ADD CONSTRAINT player_pkey PRIMARY KEY (id_player);
 =   ALTER TABLE ONLY public.players DROP CONSTRAINT player_pkey;
       public            angela    false    238            &           2606    16878 #   referee_reports referee_report_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.referee_reports
    ADD CONSTRAINT referee_report_pkey PRIMARY KEY (id);
 M   ALTER TABLE ONLY public.referee_reports DROP CONSTRAINT referee_report_pkey;
       public            angela    false    242            $           2606    17550    referees referees_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.referees
    ADD CONSTRAINT referees_pkey PRIMARY KEY (id_referee);
 @   ALTER TABLE ONLY public.referees DROP CONSTRAINT referees_pkey;
       public            angela    false    240            (           2606    16889    reports report_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT report_pkey PRIMARY KEY (report_id);
 =   ALTER TABLE ONLY public.reports DROP CONSTRAINT report_pkey;
       public            angela    false    244            8           2606    17589 (   shirt_colors shirt_colors_codigo_hex_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.shirt_colors
    ADD CONSTRAINT shirt_colors_codigo_hex_key UNIQUE (codigo_hex);
 R   ALTER TABLE ONLY public.shirt_colors DROP CONSTRAINT shirt_colors_codigo_hex_key;
       public            angela    false    260            :           2606    17587    shirt_colors shirt_colors_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.shirt_colors
    ADD CONSTRAINT shirt_colors_pkey PRIMARY KEY (id_scolor);
 H   ALTER TABLE ONLY public.shirt_colors DROP CONSTRAINT shirt_colors_pkey;
       public            angela    false    260            *           2606    16898    teams team_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.teams
    ADD CONSTRAINT team_pkey PRIMARY KEY (team_id);
 9   ALTER TABLE ONLY public.teams DROP CONSTRAINT team_pkey;
       public            angela    false    246            ,           2606    16905    team_players team_player_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.team_players
    ADD CONSTRAINT team_player_pkey PRIMARY KEY (id_player, team_id);
 G   ALTER TABLE ONLY public.team_players DROP CONSTRAINT team_player_pkey;
       public            angela    false    247    247            .           2606    16914 +   technical_directors technical_director_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.technical_directors
    ADD CONSTRAINT technical_director_pkey PRIMARY KEY (id_td);
 U   ALTER TABLE ONLY public.technical_directors DROP CONSTRAINT technical_director_pkey;
       public            angela    false    249            4           2606    17385    treasurers treasurer_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.treasurers
    ADD CONSTRAINT treasurer_pkey PRIMARY KEY (id_treasurer);
 C   ALTER TABLE ONLY public.treasurers DROP CONSTRAINT treasurer_pkey;
       public            angela    false    255            "           2606    17479    players unique_id_card 
   CONSTRAINT     T   ALTER TABLE ONLY public.players
    ADD CONSTRAINT unique_id_card UNIQUE (id_card);
 @   ALTER TABLE ONLY public.players DROP CONSTRAINT unique_id_card;
       public            angela    false    238            0           2606    16923    users user_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_user);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT user_pkey;
       public            angela    false    251            ;           2606    17533    admins admins_id_user_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user);
 D   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_id_user_fkey;
       public          angela    false    251    216    4912            @           2606    17576    championships fk_category    FK CONSTRAINT     �   ALTER TABLE ONLY public.championships
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.categories(category_id);
 C   ALTER TABLE ONLY public.championships DROP CONSTRAINT fk_category;
       public          angela    false    220    226    4878            <           2606    16967 ,   champion_games fk_champion_game_championship    FK CONSTRAINT     �   ALTER TABLE ONLY public.champion_games
    ADD CONSTRAINT fk_champion_game_championship FOREIGN KEY (championship_id) REFERENCES public.championships(championship_id);
 V   ALTER TABLE ONLY public.champion_games DROP CONSTRAINT fk_champion_game_championship;
       public          angela    false    226    4884    222            =           2606    16972 $   champion_games fk_champion_game_game    FK CONSTRAINT     �   ALTER TABLE ONLY public.champion_games
    ADD CONSTRAINT fk_champion_game_game FOREIGN KEY (game_id) REFERENCES public.games(game_id);
 N   ALTER TABLE ONLY public.champion_games DROP CONSTRAINT fk_champion_game_game;
       public          angela    false    4888    222    230            >           2606    16977 ,   champion_teams fk_champion_team_championship    FK CONSTRAINT     �   ALTER TABLE ONLY public.champion_teams
    ADD CONSTRAINT fk_champion_team_championship FOREIGN KEY (championship_id) REFERENCES public.championships(championship_id);
 V   ALTER TABLE ONLY public.champion_teams DROP CONSTRAINT fk_champion_team_championship;
       public          angela    false    224    4884    226            ?           2606    16982 $   champion_teams fk_champion_team_team    FK CONSTRAINT     �   ALTER TABLE ONLY public.champion_teams
    ADD CONSTRAINT fk_champion_team_team FOREIGN KEY (team_id) REFERENCES public.teams(team_id);
 N   ALTER TABLE ONLY public.champion_teams DROP CONSTRAINT fk_champion_team_team;
       public          angela    false    224    4906    246            B           2606    16987    chronologies fk_chronology_card    FK CONSTRAINT     �   ALTER TABLE ONLY public.chronologies
    ADD CONSTRAINT fk_chronology_card FOREIGN KEY (card_id) REFERENCES public.cards(card_id);
 I   ALTER TABLE ONLY public.chronologies DROP CONSTRAINT fk_chronology_card;
       public          angela    false    4876    218    228            C           2606    16992    chronologies fk_chronology_game    FK CONSTRAINT     �   ALTER TABLE ONLY public.chronologies
    ADD CONSTRAINT fk_chronology_game FOREIGN KEY (g_id) REFERENCES public.games(game_id);
 I   ALTER TABLE ONLY public.chronologies DROP CONSTRAINT fk_chronology_game;
       public          angela    false    228    230    4888            D           2606    16997 !   chronologies fk_chronology_player    FK CONSTRAINT     �   ALTER TABLE ONLY public.chronologies
    ADD CONSTRAINT fk_chronology_player FOREIGN KEY (id_player) REFERENCES public.players(id_player);
 K   ALTER TABLE ONLY public.chronologies DROP CONSTRAINT fk_chronology_player;
       public          angela    false    4896    228    238            E           2606    17002 "   game_referees fk_game_referee_game    FK CONSTRAINT     �   ALTER TABLE ONLY public.game_referees
    ADD CONSTRAINT fk_game_referee_game FOREIGN KEY (game_id) REFERENCES public.games(game_id);
 L   ALTER TABLE ONLY public.game_referees DROP CONSTRAINT fk_game_referee_game;
       public          angela    false    230    232    4888            A           2606    17571    championships fk_group    FK CONSTRAINT     ~   ALTER TABLE ONLY public.championships
    ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES public."group"(group_id);
 @   ALTER TABLE ONLY public.championships DROP CONSTRAINT fk_group;
       public          angela    false    4892    226    234            T           2606    17454    payment_details fk_payment    FK CONSTRAINT     �   ALTER TABLE ONLY public.payment_details
    ADD CONSTRAINT fk_payment FOREIGN KEY (payment_id) REFERENCES public.payment(payment_id);
 D   ALTER TABLE ONLY public.payment_details DROP CONSTRAINT fk_payment;
       public          angela    false    253    4914    257            F           2606    17017    phases fk_phases_championship    FK CONSTRAINT     �   ALTER TABLE ONLY public.phases
    ADD CONSTRAINT fk_phases_championship FOREIGN KEY (championship_id) REFERENCES public.championships(championship_id);
 G   ALTER TABLE ONLY public.phases DROP CONSTRAINT fk_phases_championship;
       public          angela    false    226    236    4884            G           2606    17551 )   referee_reports fk_referee_report_referee    FK CONSTRAINT     �   ALTER TABLE ONLY public.referee_reports
    ADD CONSTRAINT fk_referee_report_referee FOREIGN KEY (id_referee) REFERENCES public.referees(id_referee);
 S   ALTER TABLE ONLY public.referee_reports DROP CONSTRAINT fk_referee_report_referee;
       public          angela    false    242    4900    240            H           2606    17027 (   referee_reports fk_referee_report_report    FK CONSTRAINT     �   ALTER TABLE ONLY public.referee_reports
    ADD CONSTRAINT fk_referee_report_report FOREIGN KEY (report_id) REFERENCES public.reports(report_id);
 R   ALTER TABLE ONLY public.referee_reports DROP CONSTRAINT fk_referee_report_report;
       public          angela    false    4904    242    244            I           2606    17032    reports fk_report_game    FK CONSTRAINT     z   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT fk_report_game FOREIGN KEY (game_id) REFERENCES public.games(game_id);
 @   ALTER TABLE ONLY public.reports DROP CONSTRAINT fk_report_game;
       public          angela    false    244    4888    230            N           2606    17047 "   team_players fk_team_player_player    FK CONSTRAINT     �   ALTER TABLE ONLY public.team_players
    ADD CONSTRAINT fk_team_player_player FOREIGN KEY (id_player) REFERENCES public.players(id_player);
 L   ALTER TABLE ONLY public.team_players DROP CONSTRAINT fk_team_player_player;
       public          angela    false    4896    247    238            O           2606    17042     team_players fk_team_player_team    FK CONSTRAINT     �   ALTER TABLE ONLY public.team_players
    ADD CONSTRAINT fk_team_player_team FOREIGN KEY (team_id) REFERENCES public.teams(team_id);
 J   ALTER TABLE ONLY public.team_players DROP CONSTRAINT fk_team_player_team;
       public          angela    false    4906    247    246            J           2606    17037    teams fk_team_td    FK CONSTRAINT     ~   ALTER TABLE ONLY public.teams
    ADD CONSTRAINT fk_team_td FOREIGN KEY (id_td) REFERENCES public.technical_directors(id_td);
 :   ALTER TABLE ONLY public.teams DROP CONSTRAINT fk_team_td;
       public          angela    false    249    246    4910            Q           2606    17416    payment fk_treasurer    FK CONSTRAINT     �   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT fk_treasurer FOREIGN KEY (id_treasurer) REFERENCES public.treasurers(id_treasurer);
 >   ALTER TABLE ONLY public.payment DROP CONSTRAINT fk_treasurer;
       public          angela    false    4916    255    253            R           2606    17394    treasurers fk_treasurer_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.treasurers
    ADD CONSTRAINT fk_treasurer_user FOREIGN KEY (id_user) REFERENCES public.users(id_user);
 F   ALTER TABLE ONLY public.treasurers DROP CONSTRAINT fk_treasurer_user;
       public          angela    false    255    251    4912            S           2606    17386    treasurers fk_user    FK CONSTRAINT     v   ALTER TABLE ONLY public.treasurers
    ADD CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES public.users(id_user);
 <   ALTER TABLE ONLY public.treasurers DROP CONSTRAINT fk_user;
       public          angela    false    4912    251    255            K           2606    17590 "   teams teams_color_primario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_color_primario_id_fkey FOREIGN KEY (color_primario_id) REFERENCES public.shirt_colors(id_scolor);
 L   ALTER TABLE ONLY public.teams DROP CONSTRAINT teams_color_primario_id_fkey;
       public          angela    false    246    4922    260            L           2606    17595 $   teams teams_color_secundario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_color_secundario_id_fkey FOREIGN KEY (color_secundario_id) REFERENCES public.shirt_colors(id_scolor);
 N   ALTER TABLE ONLY public.teams DROP CONSTRAINT teams_color_secundario_id_fkey;
       public          angela    false    4922    246    260            M           2606    17480    teams teams_id_treasurer_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_id_treasurer_fkey FOREIGN KEY (id_treasurer) REFERENCES public.treasurers(id_treasurer);
 G   ALTER TABLE ONLY public.teams DROP CONSTRAINT teams_id_treasurer_fkey;
       public          angela    false    4916    246    255            P           2606    17538 4   technical_directors technical_directors_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.technical_directors
    ADD CONSTRAINT technical_directors_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user);
 ^   ALTER TABLE ONLY public.technical_directors DROP CONSTRAINT technical_directors_id_user_fkey;
       public          angela    false    4912    249    251            �      x������ � �      �   z   x��̱
�@��9y
_��KN��.���C3��B�>��R3�?�v�'pb鈻$*5i��Sɪ��p0���;_,@���(����(�m���'Ri��t]����+Q���[{D� �)It      �   S   x��ʱ� ��g
�#��!�����,��d���).5(>X1&�T����Yޝ\�������5|�o��p���ƑE�ڌ'�      �   `   x����� ��s2E ����,����Ԁ|�d��=bŘ`�p��Ȇ��/���H��єP�".����=�#��T��	�$&h��;���J@�      �      x������ � �      �     x�œ�n�0�g�~��11�V��v��%�P@*%��k~���N �������1�����*S׊N�
�BP�sDl�I��8�%,�u�$&?��c	f�1Jb_���+ �^5��ϊ��=X���ՍL˼n�Ks+�]v�ı�V�Y����܃ ���CeR�E 8y�/����������O2�B�Ln ��<[`��qq��޲ľ�E��Q_w���#C�'@=i�R�͏�e� �T�3]�g���'������?EA|ɗ,�      �   F   x�}ʹ�0��Tأ�c��8���j6�^>�Z�и�v�v���pY`i�+m�"K;_Di�"���#�      �   E   x�}ʱ�0���"��	D�gI�	���_ ]{Lȇ�����]�^�cU.c@N{nH
�B��N3��!      �   �   x���1�0@�9>E/��v'd���� �0�����Q�2x���O��ţzBGX���2\����zG7�>{����T�!��%oJr$Ew�h+qUغe��떓��U���,3�hw�\��L$����J��*�B؝�e� ޮ4�v      �      x������ � �      
      x������ � �            x������ � �      �      x������ � �      �   �  x��V�n�H<��B?@��{z^7#Hq`�!']�(ˍLz))0�G{�Oȏm)ɢ�xm��"k���k�������k�Z��ͦQ���J�/O�ɑ�o=9��bvβE�Vm�6�
�3���j��Ǯ��S�/3�V7�Ԫ�����y\|���3A�s�p$��'H�^$Q��"z�'H�>$���E�	�Qɰu>�P�R$��R���95�5�;�HA���.87�&DQnu$oSߨ�ܧ�6�f���áb���IG�=�5j�W�ݤaU?�Z�쭫:Y���c)���qQs]���NVE7� l�M�gj��Z��.s&৩�HP F�#�XA�4������߻��v���]�a�A7G�E�Ș��c����(,/LՇ�?䶈3:*i�9A�C�6��[f�B�f�ރ�ՕT�G��o���� �Ek����[vr9f��;�cSD]��'�M3���6����r��e�������/�)\���R^��k� ��v�w������N�k�^���9�{M�^����#b�-��L[|��C�l�Mj;�Mk�}��j�]�Y�&��d������<�BD[K�x� ��M�M"8w���]�y3�p{�p��=גfTp��]�������UZW���tt���}-S\@���>m�u�p,Y��P�QɎ���D1V�����aa�C�$��{٘
\U��36x�ᯱ��Ccw��m�c�Tѥz��:�*��ď�~��}?����'��9J��H�F �N����%�e���A)!|y`��1����,�^�U�N�	�������~�+�X�C�Xu�ڼ�����8���JEѐlD��U	"�0���(���"���qFe�jiNG��g�T�o	���Q�œ���KvEJ���E��Z�D�%�䷷+g��ja���9�\��	_bS��l6�5�9�      �   [   x�}̱� �ڞ"����YRg�쯸��е�7ɢ� ��(b��ձ0��V˟��Uo�TvB�����Ԣ3��ggT�Gg����<����4      �   u  x���Kn�@�ףS�H��+
4EF
t�OR��Pl�����r�r$;GE
����Ϗ�V]�!���>6Ð�dE��5Ϋ͕�)�K��-"�H\�j�0(��VF��v��"ߧ�BK�|0j���-3��m��čv��Y"-�,��1��$��/!ȇ
���ߥ�Q�ڮk��C3(���^��K�El�P�`АH���BT�fص}V��oӡQH| (.5j��<q|jyz�G�Ήsr�8&���5>�)�q�
a���X>�����$o'o��j�B$SK����[ɨ�Dex]~8֔\�L����l���檒h��^�e���x�}���C�P�q��oV��g���ss߲���X[��fL�y�{+A8R���a&���t�˃�m{��$�s'B� m��g�'��H� _�Wtܙ��7n����L,���;��d��vh���|��|�,G�B�hb�]��,;�#i�Ng�\������Qق�}�k�PF��ݨ{�y��V(�x�g�;jə��i��Ui�δj�Aql5�s3@�3u1%�j�H`K��Y+N_�����	g<�;����ҡ�)�^4]��$+�A����NYY.Ǧ#C��
��զ���/G�>           x���;N�0@��)F�N��'ɦ�	

�mF�A���*q�>��#��p�H(�f,Y�%<��[��<&����6NnF�͇<���S�6����� YT���
��ܜ���ϰ�3fn��Ux�g�]���!�\�J�ʠv�^���w�u�x\��8��w�aI	zG`���L��3���6�����19�C<o����\ܸ�U�����¦�� �ա�mg�R�C�����H?d:-;eJ��J��� �+�ۡU)I��T
!� ���           x�=�;�� Dc�Χ@�_�7���ϱ-	�^5a=[�����z�.� �,��@�mV���%�j,)VcP��8��z{{o�!��Q����-;���SR��O��p<�9<���6�&�3\��+)�%Cy�I�8+��S�n\j4�'�e��fR�˘%;A\Zq�N���݁��J�����I�\⮫�s���1�ep��/���N��*=�u�Kiԗ�Ke5pY��ZJ2�H��;{e�d/��\��ͥ�$8��ҕ�2)U�=.~��G��Q�U�������y�         6   x�3�4��,�4202�50�5�P02�20�22�3�4��0�2%��А��=... Fb�         v   x�34�<ܘ^���X����ih�Y�id`d�k`�kh�`hheBz���Ɯ1~@�T�_������Z�U��������9B�X�GbN2X�%�###+s+#C=#�cNS�=... x	"�         ,  x�m�ˑ#1C�dN�*�HT,s�6�Z��a=vW�֯  BI��d<�=9�y|�9�T@�+�q&��(T��p�|E�u�1Ȭ�"�un��HS�������,��"1�+f)���;$Gn��(A�"{pP9���!5�`�J�8��מJJ��@� F'O�I���\�����^J�w�ad�MB|y`c[y-e
��8��r[-��o��;Ӯ%�dXG.�[q�	o���^�gK��~C0�l+=��L~%��j��{KT6Aٯ���������0�k��M���_Z��Az�{�%�_CU��|�X         y   x�]���@�ji�[�����I����q#0�� ���!(�P?ܖ�d�n�6Kp�a`�� �8���6.����0�* ���}'�����]�\��HԘM�d�z�I��������v�K���B&         �  x��U�j�@}^�~������Lh!-��<�eq�ĭ"5�!���OȏuV�㕜R�E؈3{�̙c qU����z����b�Y<
Th���*Q�HJ����g�$���#
�=	$@/.������ �
!*ep���$ x5Wf��V\��~��
�xR��TQQ�V:��~�2!�U>�:qݵ�$�R��/�;�H�h��Z��+0��I�"���0б�������ש]�s7@��|��R �Q��C[��>b�|rʂ�֛5?��T���;�6�/7c�/럛�K�v�X�	[���h~m�[���}�A,��kj��n6M�6ϩ�w硬*�<���T
�4��jp<��G�(ʤ�Ge$��h.��Sj���1�}(��ڲ�� 4����<���n혿���1>������m�������c�#HvA�X � �Ġ�hC�$ K�������^"�����/�@$�o�-��k>fm�Gh�N#9��.&a�Vz+y�:���]t�ǃyH m@]����`�ok��������E�S���<���p�Ӽ���
�$���ƗN[���-�,*<�{�h��f��AL*`4�H��]!5�]V����g&M�Ug�iյh Ǒ����7�ò�C�����JSZ��c0/PQ���\P����Ln>�nSۉ�?�s��Ci�ʄ!� ����A
g��ev�\��l���     