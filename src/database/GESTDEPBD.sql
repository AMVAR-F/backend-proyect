PGDMP  ;    5                |         	   GESTDEPBD    16.4    16.4 �               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16741 	   GESTDEPBD    DATABASE     ~   CREATE DATABASE "GESTDEPBD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "GESTDEPBD";
                angela    false            �           1247    17351 	   positions    TYPE     g   CREATE TYPE public.positions AS ENUM (
    'Portero',
    'Delantero',
    'Defensa',
    'Lateral'
);
    DROP TYPE public.positions;
       public          angela    false            �            1259    16752    admins    TABLE     �   CREATE TABLE public.admins (
    id_admin integer NOT NULL,
    id_user integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
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
       public          angela    false    216                       0    0    admin_id_admin_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.admin_id_admin_seq OWNED BY public.admins.id_admin;
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
       public          angela    false    218                       0    0    card_card_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.card_card_id_seq OWNED BY public.cards.card_id;
          public          angela    false    217            �            1259    16770 
   categories    TABLE     �   CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_name character varying(30),
    team_id integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
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
       public          angela    false    220                       0    0    category_category_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.category_category_id_seq OWNED BY public.categories.category_id;
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
       public          angela    false    222                        0    0    champion_game_id_c_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.champion_game_id_c_seq OWNED BY public.champion_games.id_c;
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
       public          angela    false    224            !           0    0    champion_team_id_seq    SEQUENCE OWNED BY     N   ALTER SEQUENCE public.champion_team_id_seq OWNED BY public.champion_teams.id;
          public          angela    false    223            �            1259    16797    championships    TABLE     �  CREATE TABLE public.championships (
    championship_id integer NOT NULL,
    championship_name character varying(30),
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    start_inscriptions timestamp without time zone,
    end_inscriptions timestamp without time zone
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
       public          angela    false    226            "           0    0     championship_championship_id_seq    SEQUENCE OWNED BY     f   ALTER SEQUENCE public.championship_championship_id_seq OWNED BY public.championships.championship_id;
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
       public          angela    false    228            #           0    0    chronology_id_chronology_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.chronology_id_chronology_seq OWNED BY public.chronologies.id_chronology;
          public          angela    false    227                       1259    16944    field    TABLE     �   CREATE TABLE public.field (
    field_id integer NOT NULL,
    name character varying(50) NOT NULL,
    price_per_hour numeric(10,2) NOT NULL,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.field;
       public         heap    angela    false                        1259    16943    field_field_id_seq    SEQUENCE     �   CREATE SEQUENCE public.field_field_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.field_field_id_seq;
       public          angela    false    257            $           0    0    field_field_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.field_field_id_seq OWNED BY public.field.field_id;
          public          angela    false    256            �            1259    16817    games    TABLE     (  CREATE TABLE public.games (
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
       public          angela    false    230            %           0    0    game_game_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.game_game_id_seq OWNED BY public.games.game_id;
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
       public          angela    false    232            &           0    0     game_referee_id_game_referee_seq    SEQUENCE OWNED BY     f   ALTER SEQUENCE public.game_referee_id_game_referee_seq OWNED BY public.game_referees.id_game_referee;
          public          angela    false    231            �            1259    16835    group    TABLE     �   CREATE TABLE public."group" (
    group_id integer NOT NULL,
    group_name character varying(60),
    championship_id integer,
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
       public          angela    false    234            '           0    0    group_group_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.group_group_id_seq OWNED BY public."group".group_id;
          public          angela    false    233                       1259    16953    payment    TABLE     z  CREATE TABLE public.payment (
    payment_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    payment_date date NOT NULL,
    payment_method character varying(50),
    status character varying(20) DEFAULT 'Pending'::character varying,
    reservation_id integer,
    status_p boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.payment;
       public         heap    angela    false                       1259    16952    payment_payment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payment_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.payment_payment_id_seq;
       public          angela    false    259            (           0    0    payment_payment_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.payment_payment_id_seq OWNED BY public.payment.payment_id;
          public          angela    false    258            �            1259    16844    phases    TABLE     �   CREATE TABLE public.phases (
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
       public          angela    false    236            )           0    0    phases_phase_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.phases_phase_id_seq OWNED BY public.phases.phase_id;
          public          angela    false    235            �            1259    16853    players    TABLE     �  CREATE TABLE public.players (
    id_player integer NOT NULL,
    id_card character varying(10),
    firstname character varying(20),
    last_name character varying(20),
    date_of_birth date,
    photo character varying(255),
    gen character(1),
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    positions_type public.positions NOT NULL
);
    DROP TABLE public.players;
       public         heap    angela    false    904            �            1259    16852    player_id_player_seq    SEQUENCE     �   CREATE SEQUENCE public.player_id_player_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.player_id_player_seq;
       public          angela    false    238            *           0    0    player_id_player_seq    SEQUENCE OWNED BY     N   ALTER SEQUENCE public.player_id_player_seq OWNED BY public.players.id_player;
          public          angela    false    237            �            1259    16862    referees    TABLE     3  CREATE TABLE public.referees (
    id_referee integer NOT NULL,
    name character varying(30),
    last_name character varying(30),
    id_card character varying(30),
    photo character varying(255),
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
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
       public          angela    false    240            +           0    0    referee_id_referee_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.referee_id_referee_seq OWNED BY public.referees.id_referee;
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
       public          angela    false    242            ,           0    0    referee_report_id_seq    SEQUENCE OWNED BY     P   ALTER SEQUENCE public.referee_report_id_seq OWNED BY public.referee_reports.id;
          public          angela    false    241            �            1259    16880    reports    TABLE     �   CREATE TABLE public.reports (
    report_id integer NOT NULL,
    description text,
    game_id integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.reports;
       public         heap    angela    false            �            1259    16879    report_report_id_seq    SEQUENCE     �   CREATE SEQUENCE public.report_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.report_report_id_seq;
       public          angela    false    244            -           0    0    report_report_id_seq    SEQUENCE OWNED BY     N   ALTER SEQUENCE public.report_report_id_seq OWNED BY public.reports.report_id;
          public          angela    false    243            �            1259    16934    reservation    TABLE     �  CREATE TABLE public.reservation (
    reservation_id integer NOT NULL,
    id_user integer,
    field_id integer,
    date date NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    status character varying(20) DEFAULT 'Reserved'::character varying,
    status_r boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.reservation;
       public         heap    angela    false            �            1259    16933    reservation_reservation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reservation_reservation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.reservation_reservation_id_seq;
       public          angela    false    255            .           0    0    reservation_reservation_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.reservation_reservation_id_seq OWNED BY public.reservation.reservation_id;
          public          angela    false    254            �            1259    16925    shirt_colors    TABLE     �   CREATE TABLE public.shirt_colors (
    id_scolor integer NOT NULL,
    name_color character varying(30),
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
     DROP TABLE public.shirt_colors;
       public         heap    angela    false            �            1259    16924    shirt_color_id_scolor_seq    SEQUENCE     �   CREATE SEQUENCE public.shirt_color_id_scolor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.shirt_color_id_scolor_seq;
       public          angela    false    253            /           0    0    shirt_color_id_scolor_seq    SEQUENCE OWNED BY     X   ALTER SEQUENCE public.shirt_color_id_scolor_seq OWNED BY public.shirt_colors.id_scolor;
          public          angela    false    252            �            1259    16899    team_players    TABLE     �   CREATE TABLE public.team_players (
    id_player integer NOT NULL,
    team_id integer NOT NULL,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
     DROP TABLE public.team_players;
       public         heap    angela    false            �            1259    16891    teams    TABLE     �   CREATE TABLE public.teams (
    team_id integer NOT NULL,
    team_name character varying(30),
    id_scolor integer,
    id_td integer NOT NULL,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
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
       public          angela    false    246            0           0    0    team_team_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.team_team_id_seq OWNED BY public.teams.team_id;
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
       public          angela    false    249            1           0    0    technical_director_id_td_seq    SEQUENCE OWNED BY     ^   ALTER SEQUENCE public.technical_director_id_td_seq OWNED BY public.technical_directors.id_td;
          public          angela    false    248                       1259    17378 
   treasurers    TABLE     �   CREATE TABLE public.treasurers (
    id_treasurer integer NOT NULL,
    id_user integer,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.treasurers;
       public         heap    angela    false                       1259    17377    treasurer_id_treasurer_seq    SEQUENCE     �   CREATE SEQUENCE public.treasurer_id_treasurer_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.treasurer_id_treasurer_seq;
       public          angela    false    261            2           0    0    treasurer_id_treasurer_seq    SEQUENCE OWNED BY     Z   ALTER SEQUENCE public.treasurer_id_treasurer_seq OWNED BY public.treasurers.id_treasurer;
          public          angela    false    260            �            1259    16916    users    TABLE     �  CREATE TABLE public.users (
    id_user integer NOT NULL,
    firstname character varying(30),
    lastname character varying(30),
    id_card character varying(8),
    photo character varying(255),
    password character varying(255),
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    email character varying(255),
    username character varying(255)
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
       public          angela    false    251            3           0    0    user_id_user_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.user_id_user_seq OWNED BY public.users.id_user;
          public          angela    false    250            �           2604    16755    admins id_admin    DEFAULT     q   ALTER TABLE ONLY public.admins ALTER COLUMN id_admin SET DEFAULT nextval('public.admin_id_admin_seq'::regclass);
 >   ALTER TABLE public.admins ALTER COLUMN id_admin DROP DEFAULT;
       public          angela    false    215    216    216            �           2604    16764    cards card_id    DEFAULT     m   ALTER TABLE ONLY public.cards ALTER COLUMN card_id SET DEFAULT nextval('public.card_card_id_seq'::regclass);
 <   ALTER TABLE public.cards ALTER COLUMN card_id DROP DEFAULT;
       public          angela    false    218    217    218            �           2604    16773    categories category_id    DEFAULT     ~   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          angela    false    220    219    220            �           2604    16782    champion_games id_c    DEFAULT     y   ALTER TABLE ONLY public.champion_games ALTER COLUMN id_c SET DEFAULT nextval('public.champion_game_id_c_seq'::regclass);
 B   ALTER TABLE public.champion_games ALTER COLUMN id_c DROP DEFAULT;
       public          angela    false    221    222    222            �           2604    16791    champion_teams id    DEFAULT     u   ALTER TABLE ONLY public.champion_teams ALTER COLUMN id SET DEFAULT nextval('public.champion_team_id_seq'::regclass);
 @   ALTER TABLE public.champion_teams ALTER COLUMN id DROP DEFAULT;
       public          angela    false    223    224    224            �           2604    16800    championships championship_id    DEFAULT     �   ALTER TABLE ONLY public.championships ALTER COLUMN championship_id SET DEFAULT nextval('public.championship_championship_id_seq'::regclass);
 L   ALTER TABLE public.championships ALTER COLUMN championship_id DROP DEFAULT;
       public          angela    false    226    225    226            �           2604    16811    chronologies id_chronology    DEFAULT     �   ALTER TABLE ONLY public.chronologies ALTER COLUMN id_chronology SET DEFAULT nextval('public.chronology_id_chronology_seq'::regclass);
 I   ALTER TABLE public.chronologies ALTER COLUMN id_chronology DROP DEFAULT;
       public          angela    false    227    228    228                       2604    16947    field field_id    DEFAULT     p   ALTER TABLE ONLY public.field ALTER COLUMN field_id SET DEFAULT nextval('public.field_field_id_seq'::regclass);
 =   ALTER TABLE public.field ALTER COLUMN field_id DROP DEFAULT;
       public          angela    false    257    256    257            �           2604    16829    game_referees id_game_referee    DEFAULT     �   ALTER TABLE ONLY public.game_referees ALTER COLUMN id_game_referee SET DEFAULT nextval('public.game_referee_id_game_referee_seq'::regclass);
 L   ALTER TABLE public.game_referees ALTER COLUMN id_game_referee DROP DEFAULT;
       public          angela    false    231    232    232            �           2604    16820    games game_id    DEFAULT     m   ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.game_game_id_seq'::regclass);
 <   ALTER TABLE public.games ALTER COLUMN game_id DROP DEFAULT;
       public          angela    false    230    229    230            �           2604    16838    group group_id    DEFAULT     r   ALTER TABLE ONLY public."group" ALTER COLUMN group_id SET DEFAULT nextval('public.group_group_id_seq'::regclass);
 ?   ALTER TABLE public."group" ALTER COLUMN group_id DROP DEFAULT;
       public          angela    false    234    233    234                       2604    16956    payment payment_id    DEFAULT     x   ALTER TABLE ONLY public.payment ALTER COLUMN payment_id SET DEFAULT nextval('public.payment_payment_id_seq'::regclass);
 A   ALTER TABLE public.payment ALTER COLUMN payment_id DROP DEFAULT;
       public          angela    false    259    258    259            �           2604    16847    phases phase_id    DEFAULT     r   ALTER TABLE ONLY public.phases ALTER COLUMN phase_id SET DEFAULT nextval('public.phases_phase_id_seq'::regclass);
 >   ALTER TABLE public.phases ALTER COLUMN phase_id DROP DEFAULT;
       public          angela    false    235    236    236            �           2604    16856    players id_player    DEFAULT     u   ALTER TABLE ONLY public.players ALTER COLUMN id_player SET DEFAULT nextval('public.player_id_player_seq'::regclass);
 @   ALTER TABLE public.players ALTER COLUMN id_player DROP DEFAULT;
       public          angela    false    238    237    238            �           2604    16874    referee_reports id    DEFAULT     w   ALTER TABLE ONLY public.referee_reports ALTER COLUMN id SET DEFAULT nextval('public.referee_report_id_seq'::regclass);
 A   ALTER TABLE public.referee_reports ALTER COLUMN id DROP DEFAULT;
       public          angela    false    241    242    242            �           2604    16865    referees id_referee    DEFAULT     y   ALTER TABLE ONLY public.referees ALTER COLUMN id_referee SET DEFAULT nextval('public.referee_id_referee_seq'::regclass);
 B   ALTER TABLE public.referees ALTER COLUMN id_referee DROP DEFAULT;
       public          angela    false    240    239    240            �           2604    16883    reports report_id    DEFAULT     u   ALTER TABLE ONLY public.reports ALTER COLUMN report_id SET DEFAULT nextval('public.report_report_id_seq'::regclass);
 @   ALTER TABLE public.reports ALTER COLUMN report_id DROP DEFAULT;
       public          angela    false    243    244    244                        2604    16937    reservation reservation_id    DEFAULT     �   ALTER TABLE ONLY public.reservation ALTER COLUMN reservation_id SET DEFAULT nextval('public.reservation_reservation_id_seq'::regclass);
 I   ALTER TABLE public.reservation ALTER COLUMN reservation_id DROP DEFAULT;
       public          angela    false    255    254    255            �           2604    16928    shirt_colors id_scolor    DEFAULT        ALTER TABLE ONLY public.shirt_colors ALTER COLUMN id_scolor SET DEFAULT nextval('public.shirt_color_id_scolor_seq'::regclass);
 E   ALTER TABLE public.shirt_colors ALTER COLUMN id_scolor DROP DEFAULT;
       public          angela    false    253    252    253            �           2604    16894    teams team_id    DEFAULT     m   ALTER TABLE ONLY public.teams ALTER COLUMN team_id SET DEFAULT nextval('public.team_team_id_seq'::regclass);
 <   ALTER TABLE public.teams ALTER COLUMN team_id DROP DEFAULT;
       public          angela    false    246    245    246            �           2604    16910    technical_directors id_td    DEFAULT     �   ALTER TABLE ONLY public.technical_directors ALTER COLUMN id_td SET DEFAULT nextval('public.technical_director_id_td_seq'::regclass);
 H   ALTER TABLE public.technical_directors ALTER COLUMN id_td DROP DEFAULT;
       public          angela    false    248    249    249                       2604    17381    treasurers id_treasurer    DEFAULT     �   ALTER TABLE ONLY public.treasurers ALTER COLUMN id_treasurer SET DEFAULT nextval('public.treasurer_id_treasurer_seq'::regclass);
 F   ALTER TABLE public.treasurers ALTER COLUMN id_treasurer DROP DEFAULT;
       public          angela    false    260    261    261            �           2604    16919    users id_user    DEFAULT     m   ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.user_id_user_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN id_user DROP DEFAULT;
       public          angela    false    251    250    251            �          0    16752    admins 
   TABLE DATA           G   COPY public.admins (id_admin, id_user, status, created_at) FROM stdin;
    public          angela    false    216   ��       �          0    16761    cards 
   TABLE DATA           H   COPY public.cards (card_id, card_color, status, created_at) FROM stdin;
    public          angela    false    218   ��       �          0    16770 
   categories 
   TABLE DATA           ]   COPY public.categories (category_id, category_name, team_id, status, created_at) FROM stdin;
    public          angela    false    220   ;�       �          0    16779    champion_games 
   TABLE DATA           \   COPY public.champion_games (id_c, game_id, championship_id, status, created_at) FROM stdin;
    public          angela    false    222   ��       �          0    16788    champion_teams 
   TABLE DATA           Z   COPY public.champion_teams (id, team_id, championship_id, status, created_at) FROM stdin;
    public          angela    false    224   �       �          0    16797    championships 
   TABLE DATA           �   COPY public.championships (championship_id, championship_name, status, created_at, start_date, end_date, start_inscriptions, end_inscriptions) FROM stdin;
    public          angela    false    226   [�       �          0    16808    chronologies 
   TABLE DATA           y   COPY public.chronologies (id_chronology, card_id, game_id, goal_number, g_id, id_player, status, created_at) FROM stdin;
    public          angela    false    228   8�                 0    16944    field 
   TABLE DATA           S   COPY public.field (field_id, name, price_per_hour, status, created_at) FROM stdin;
    public          angela    false    257   ��       �          0    16826    game_referees 
   TABLE DATA           a   COPY public.game_referees (id_game_referee, id_referee, game_id, status, created_at) FROM stdin;
    public          angela    false    232   �       �          0    16817    games 
   TABLE DATA           g   COPY public.games (game_id, game_date, start_time, end_time, location, status, created_at) FROM stdin;
    public          angela    false    230   X�       �          0    16835    group 
   TABLE DATA           \   COPY public."group" (group_id, group_name, championship_id, status, created_at) FROM stdin;
    public          angela    false    234    �                 0    16953    payment 
   TABLE DATA           �   COPY public.payment (payment_id, amount, payment_date, payment_method, status, reservation_id, status_p, created_at) FROM stdin;
    public          angela    false    259   �       �          0    16844    phases 
   TABLE DATA           [   COPY public.phases (phase_id, phase_name, championship_id, status, created_at) FROM stdin;
    public          angela    false    236   ��       �          0    16853    players 
   TABLE DATA           �   COPY public.players (id_player, id_card, firstname, last_name, date_of_birth, photo, gen, status, created_at, positions_type) FROM stdin;
    public          angela    false    238   ��                 0    16871    referee_reports 
   TABLE DATA           X   COPY public.referee_reports (id, id_referee, report_id, status, created_at) FROM stdin;
    public          angela    false    242   ��                 0    16862    referees 
   TABLE DATA           c   COPY public.referees (id_referee, name, last_name, id_card, photo, status, created_at) FROM stdin;
    public          angela    false    240   5�                 0    16880    reports 
   TABLE DATA           V   COPY public.reports (report_id, description, game_id, status, created_at) FROM stdin;
    public          angela    false    244   ��                 0    16934    reservation 
   TABLE DATA           �   COPY public.reservation (reservation_id, id_user, field_id, date, start_time, end_time, status, status_r, created_at) FROM stdin;
    public          angela    false    255   ��                 0    16925    shirt_colors 
   TABLE DATA           Q   COPY public.shirt_colors (id_scolor, name_color, status, created_at) FROM stdin;
    public          angela    false    253   I�                 0    16899    team_players 
   TABLE DATA           N   COPY public.team_players (id_player, team_id, status, created_at) FROM stdin;
    public          angela    false    247   ��                 0    16891    teams 
   TABLE DATA           Y   COPY public.teams (team_id, team_name, id_scolor, id_td, status, created_at) FROM stdin;
    public          angela    false    246   ��       
          0    16907    technical_directors 
   TABLE DATA           Q   COPY public.technical_directors (id_td, id_user, status, created_at) FROM stdin;
    public          angela    false    249   [�                 0    17378 
   treasurers 
   TABLE DATA           O   COPY public.treasurers (id_treasurer, id_user, status, created_at) FROM stdin;
    public          angela    false    261   ��                 0    16916    users 
   TABLE DATA           |   COPY public.users (id_user, firstname, lastname, id_card, photo, password, status, created_at, email, username) FROM stdin;
    public          angela    false    251   ��       4           0    0    admin_id_admin_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.admin_id_admin_seq', 1, false);
          public          angela    false    215            5           0    0    card_card_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.card_card_id_seq', 15, true);
          public          angela    false    217            6           0    0    category_category_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.category_category_id_seq', 10, true);
          public          angela    false    219            7           0    0    champion_game_id_c_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.champion_game_id_c_seq', 20, true);
          public          angela    false    221            8           0    0    champion_team_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.champion_team_id_seq', 25, true);
          public          angela    false    223            9           0    0     championship_championship_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.championship_championship_id_seq', 10, true);
          public          angela    false    225            :           0    0    chronology_id_chronology_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.chronology_id_chronology_seq', 10, true);
          public          angela    false    227            ;           0    0    field_field_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.field_field_id_seq', 5, true);
          public          angela    false    256            <           0    0    game_game_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.game_game_id_seq', 15, true);
          public          angela    false    229            =           0    0     game_referee_id_game_referee_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.game_referee_id_game_referee_seq', 15, true);
          public          angela    false    231            >           0    0    group_group_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.group_group_id_seq', 1, false);
          public          angela    false    233            ?           0    0    payment_payment_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.payment_payment_id_seq', 11, true);
          public          angela    false    258            @           0    0    phases_phase_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.phases_phase_id_seq', 1, false);
          public          angela    false    235            A           0    0    player_id_player_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.player_id_player_seq', 1, true);
          public          angela    false    237            B           0    0    referee_id_referee_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.referee_id_referee_seq', 1, false);
          public          angela    false    239            C           0    0    referee_report_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.referee_report_id_seq', 15, true);
          public          angela    false    241            D           0    0    report_report_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.report_report_id_seq', 1, false);
          public          angela    false    243            E           0    0    reservation_reservation_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.reservation_reservation_id_seq', 11, true);
          public          angela    false    254            F           0    0    shirt_color_id_scolor_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.shirt_color_id_scolor_seq', 15, true);
          public          angela    false    252            G           0    0    team_team_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.team_team_id_seq', 8, true);
          public          angela    false    245            H           0    0    technical_director_id_td_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.technical_director_id_td_seq', 1, true);
          public          angela    false    248            I           0    0    treasurer_id_treasurer_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.treasurer_id_treasurer_seq', 1, true);
          public          angela    false    260            J           0    0    user_id_user_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_id_user_seq', 23, true);
          public          angela    false    250                       2606    16759    admins admin_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id_admin);
 ;   ALTER TABLE ONLY public.admins DROP CONSTRAINT admin_pkey;
       public            angela    false    216                       2606    16768    cards card_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.cards
    ADD CONSTRAINT card_pkey PRIMARY KEY (card_id);
 9   ALTER TABLE ONLY public.cards DROP CONSTRAINT card_pkey;
       public            angela    false    218                       2606    16777    categories category_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);
 B   ALTER TABLE ONLY public.categories DROP CONSTRAINT category_pkey;
       public            angela    false    220                       2606    16786 !   champion_games champion_game_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.champion_games
    ADD CONSTRAINT champion_game_pkey PRIMARY KEY (id_c);
 K   ALTER TABLE ONLY public.champion_games DROP CONSTRAINT champion_game_pkey;
       public            angela    false    222                       2606    16795 !   champion_teams champion_team_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.champion_teams
    ADD CONSTRAINT champion_team_pkey PRIMARY KEY (id);
 K   ALTER TABLE ONLY public.champion_teams DROP CONSTRAINT champion_team_pkey;
       public            angela    false    224                       2606    16806    championships championship_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.championships
    ADD CONSTRAINT championship_pkey PRIMARY KEY (championship_id);
 I   ALTER TABLE ONLY public.championships DROP CONSTRAINT championship_pkey;
       public            angela    false    226                       2606    16815    chronologies chronology_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.chronologies
    ADD CONSTRAINT chronology_pkey PRIMARY KEY (id_chronology);
 F   ALTER TABLE ONLY public.chronologies DROP CONSTRAINT chronology_pkey;
       public            angela    false    228            ;           2606    16951    field field_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.field
    ADD CONSTRAINT field_pkey PRIMARY KEY (field_id);
 :   ALTER TABLE ONLY public.field DROP CONSTRAINT field_pkey;
       public            angela    false    257                       2606    16824    games game_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.games
    ADD CONSTRAINT game_pkey PRIMARY KEY (game_id);
 9   ALTER TABLE ONLY public.games DROP CONSTRAINT game_pkey;
       public            angela    false    230                       2606    16833    game_referees game_referee_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.game_referees
    ADD CONSTRAINT game_referee_pkey PRIMARY KEY (id_game_referee);
 I   ALTER TABLE ONLY public.game_referees DROP CONSTRAINT game_referee_pkey;
       public            angela    false    232            !           2606    16842    group group_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (group_id);
 <   ALTER TABLE ONLY public."group" DROP CONSTRAINT group_pkey;
       public            angela    false    234            =           2606    16961    payment payment_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (payment_id);
 >   ALTER TABLE ONLY public.payment DROP CONSTRAINT payment_pkey;
       public            angela    false    259            #           2606    16851    phases phases_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.phases
    ADD CONSTRAINT phases_pkey PRIMARY KEY (phase_id);
 <   ALTER TABLE ONLY public.phases DROP CONSTRAINT phases_pkey;
       public            angela    false    236            %           2606    16860    players player_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.players
    ADD CONSTRAINT player_pkey PRIMARY KEY (id_player);
 =   ALTER TABLE ONLY public.players DROP CONSTRAINT player_pkey;
       public            angela    false    238            '           2606    16869    referees referee_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.referees
    ADD CONSTRAINT referee_pkey PRIMARY KEY (id_referee);
 ?   ALTER TABLE ONLY public.referees DROP CONSTRAINT referee_pkey;
       public            angela    false    240            )           2606    16878 #   referee_reports referee_report_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.referee_reports
    ADD CONSTRAINT referee_report_pkey PRIMARY KEY (id);
 M   ALTER TABLE ONLY public.referee_reports DROP CONSTRAINT referee_report_pkey;
       public            angela    false    242            +           2606    16889    reports report_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT report_pkey PRIMARY KEY (report_id);
 =   ALTER TABLE ONLY public.reports DROP CONSTRAINT report_pkey;
       public            angela    false    244            9           2606    16942    reservation reservation_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (reservation_id);
 F   ALTER TABLE ONLY public.reservation DROP CONSTRAINT reservation_pkey;
       public            angela    false    255            7           2606    16932    shirt_colors shirt_color_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.shirt_colors
    ADD CONSTRAINT shirt_color_pkey PRIMARY KEY (id_scolor);
 G   ALTER TABLE ONLY public.shirt_colors DROP CONSTRAINT shirt_color_pkey;
       public            angela    false    253            -           2606    16898    teams team_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.teams
    ADD CONSTRAINT team_pkey PRIMARY KEY (team_id);
 9   ALTER TABLE ONLY public.teams DROP CONSTRAINT team_pkey;
       public            angela    false    246            /           2606    16905    team_players team_player_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.team_players
    ADD CONSTRAINT team_player_pkey PRIMARY KEY (id_player, team_id);
 G   ALTER TABLE ONLY public.team_players DROP CONSTRAINT team_player_pkey;
       public            angela    false    247    247            1           2606    16914 +   technical_directors technical_director_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.technical_directors
    ADD CONSTRAINT technical_director_pkey PRIMARY KEY (id_td);
 U   ALTER TABLE ONLY public.technical_directors DROP CONSTRAINT technical_director_pkey;
       public            angela    false    249            ?           2606    17385    treasurers treasurer_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.treasurers
    ADD CONSTRAINT treasurer_pkey PRIMARY KEY (id_treasurer);
 C   ALTER TABLE ONLY public.treasurers DROP CONSTRAINT treasurer_pkey;
       public            angela    false    261            3           2606    17410    users unique_email 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT unique_email;
       public            angela    false    251            5           2606    16923    users user_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_user);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT user_pkey;
       public            angela    false    251            @           2606    16962    admins fk_admin_user    FK CONSTRAINT     x   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT fk_admin_user FOREIGN KEY (id_user) REFERENCES public.users(id_user);
 >   ALTER TABLE ONLY public.admins DROP CONSTRAINT fk_admin_user;
       public          angela    false    251    216    4917            A           2606    16967 ,   champion_games fk_champion_game_championship    FK CONSTRAINT     �   ALTER TABLE ONLY public.champion_games
    ADD CONSTRAINT fk_champion_game_championship FOREIGN KEY (championship_id) REFERENCES public.championships(championship_id);
 V   ALTER TABLE ONLY public.champion_games DROP CONSTRAINT fk_champion_game_championship;
       public          angela    false    226    222    4889            B           2606    16972 $   champion_games fk_champion_game_game    FK CONSTRAINT     �   ALTER TABLE ONLY public.champion_games
    ADD CONSTRAINT fk_champion_game_game FOREIGN KEY (game_id) REFERENCES public.games(game_id);
 N   ALTER TABLE ONLY public.champion_games DROP CONSTRAINT fk_champion_game_game;
       public          angela    false    222    4893    230            C           2606    16977 ,   champion_teams fk_champion_team_championship    FK CONSTRAINT     �   ALTER TABLE ONLY public.champion_teams
    ADD CONSTRAINT fk_champion_team_championship FOREIGN KEY (championship_id) REFERENCES public.championships(championship_id);
 V   ALTER TABLE ONLY public.champion_teams DROP CONSTRAINT fk_champion_team_championship;
       public          angela    false    224    226    4889            D           2606    16982 $   champion_teams fk_champion_team_team    FK CONSTRAINT     �   ALTER TABLE ONLY public.champion_teams
    ADD CONSTRAINT fk_champion_team_team FOREIGN KEY (team_id) REFERENCES public.teams(team_id);
 N   ALTER TABLE ONLY public.champion_teams DROP CONSTRAINT fk_champion_team_team;
       public          angela    false    4909    224    246            E           2606    16987    chronologies fk_chronology_card    FK CONSTRAINT     �   ALTER TABLE ONLY public.chronologies
    ADD CONSTRAINT fk_chronology_card FOREIGN KEY (card_id) REFERENCES public.cards(card_id);
 I   ALTER TABLE ONLY public.chronologies DROP CONSTRAINT fk_chronology_card;
       public          angela    false    228    4881    218            F           2606    16992    chronologies fk_chronology_game    FK CONSTRAINT     �   ALTER TABLE ONLY public.chronologies
    ADD CONSTRAINT fk_chronology_game FOREIGN KEY (g_id) REFERENCES public.games(game_id);
 I   ALTER TABLE ONLY public.chronologies DROP CONSTRAINT fk_chronology_game;
       public          angela    false    228    4893    230            G           2606    16997 !   chronologies fk_chronology_player    FK CONSTRAINT     �   ALTER TABLE ONLY public.chronologies
    ADD CONSTRAINT fk_chronology_player FOREIGN KEY (id_player) REFERENCES public.players(id_player);
 K   ALTER TABLE ONLY public.chronologies DROP CONSTRAINT fk_chronology_player;
       public          angela    false    238    228    4901            H           2606    17002 "   game_referees fk_game_referee_game    FK CONSTRAINT     �   ALTER TABLE ONLY public.game_referees
    ADD CONSTRAINT fk_game_referee_game FOREIGN KEY (game_id) REFERENCES public.games(game_id);
 L   ALTER TABLE ONLY public.game_referees DROP CONSTRAINT fk_game_referee_game;
       public          angela    false    232    4893    230            I           2606    17007 %   game_referees fk_game_referee_referee    FK CONSTRAINT     �   ALTER TABLE ONLY public.game_referees
    ADD CONSTRAINT fk_game_referee_referee FOREIGN KEY (id_referee) REFERENCES public.referees(id_referee);
 O   ALTER TABLE ONLY public.game_referees DROP CONSTRAINT fk_game_referee_referee;
       public          angela    false    240    4903    232            J           2606    17012    group fk_group_championship    FK CONSTRAINT     �   ALTER TABLE ONLY public."group"
    ADD CONSTRAINT fk_group_championship FOREIGN KEY (championship_id) REFERENCES public.championships(championship_id);
 G   ALTER TABLE ONLY public."group" DROP CONSTRAINT fk_group_championship;
       public          angela    false    226    4889    234            V           2606    17072    payment fk_payment_reservation    FK CONSTRAINT     �   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT fk_payment_reservation FOREIGN KEY (reservation_id) REFERENCES public.reservation(reservation_id);
 H   ALTER TABLE ONLY public.payment DROP CONSTRAINT fk_payment_reservation;
       public          angela    false    4921    259    255            K           2606    17017    phases fk_phases_championship    FK CONSTRAINT     �   ALTER TABLE ONLY public.phases
    ADD CONSTRAINT fk_phases_championship FOREIGN KEY (championship_id) REFERENCES public.championships(championship_id);
 G   ALTER TABLE ONLY public.phases DROP CONSTRAINT fk_phases_championship;
       public          angela    false    226    4889    236            L           2606    17022 )   referee_reports fk_referee_report_referee    FK CONSTRAINT     �   ALTER TABLE ONLY public.referee_reports
    ADD CONSTRAINT fk_referee_report_referee FOREIGN KEY (id_referee) REFERENCES public.referees(id_referee);
 S   ALTER TABLE ONLY public.referee_reports DROP CONSTRAINT fk_referee_report_referee;
       public          angela    false    242    4903    240            M           2606    17027 (   referee_reports fk_referee_report_report    FK CONSTRAINT     �   ALTER TABLE ONLY public.referee_reports
    ADD CONSTRAINT fk_referee_report_report FOREIGN KEY (report_id) REFERENCES public.reports(report_id);
 R   ALTER TABLE ONLY public.referee_reports DROP CONSTRAINT fk_referee_report_report;
       public          angela    false    4907    244    242            N           2606    17032    reports fk_report_game    FK CONSTRAINT     z   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT fk_report_game FOREIGN KEY (game_id) REFERENCES public.games(game_id);
 @   ALTER TABLE ONLY public.reports DROP CONSTRAINT fk_report_game;
       public          angela    false    4893    244    230            T           2606    17067     reservation fk_reservation_field    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_reservation_field FOREIGN KEY (field_id) REFERENCES public.field(field_id);
 J   ALTER TABLE ONLY public.reservation DROP CONSTRAINT fk_reservation_field;
       public          angela    false    255    4923    257            U           2606    17062    reservation fk_reservation_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_reservation_user FOREIGN KEY (id_user) REFERENCES public.users(id_user);
 I   ALTER TABLE ONLY public.reservation DROP CONSTRAINT fk_reservation_user;
       public          angela    false    251    255    4917            Q           2606    17047 "   team_players fk_team_player_player    FK CONSTRAINT     �   ALTER TABLE ONLY public.team_players
    ADD CONSTRAINT fk_team_player_player FOREIGN KEY (id_player) REFERENCES public.players(id_player);
 L   ALTER TABLE ONLY public.team_players DROP CONSTRAINT fk_team_player_player;
       public          angela    false    238    247    4901            R           2606    17042     team_players fk_team_player_team    FK CONSTRAINT     �   ALTER TABLE ONLY public.team_players
    ADD CONSTRAINT fk_team_player_team FOREIGN KEY (team_id) REFERENCES public.teams(team_id);
 J   ALTER TABLE ONLY public.team_players DROP CONSTRAINT fk_team_player_team;
       public          angela    false    247    4909    246            O           2606    17057    teams fk_team_scolor    FK CONSTRAINT     �   ALTER TABLE ONLY public.teams
    ADD CONSTRAINT fk_team_scolor FOREIGN KEY (id_scolor) REFERENCES public.shirt_colors(id_scolor);
 >   ALTER TABLE ONLY public.teams DROP CONSTRAINT fk_team_scolor;
       public          angela    false    4919    246    253            P           2606    17037    teams fk_team_td    FK CONSTRAINT     ~   ALTER TABLE ONLY public.teams
    ADD CONSTRAINT fk_team_td FOREIGN KEY (id_td) REFERENCES public.technical_directors(id_td);
 :   ALTER TABLE ONLY public.teams DROP CONSTRAINT fk_team_td;
       public          angela    false    246    4913    249            S           2606    17052 .   technical_directors fk_technical_director_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.technical_directors
    ADD CONSTRAINT fk_technical_director_user FOREIGN KEY (id_user) REFERENCES public.users(id_user);
 X   ALTER TABLE ONLY public.technical_directors DROP CONSTRAINT fk_technical_director_user;
       public          angela    false    4917    251    249            W           2606    17394    treasurers fk_treasurer_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.treasurers
    ADD CONSTRAINT fk_treasurer_user FOREIGN KEY (id_user) REFERENCES public.users(id_user);
 F   ALTER TABLE ONLY public.treasurers DROP CONSTRAINT fk_treasurer_user;
       public          angela    false    4917    261    251            X           2606    17386    treasurers fk_user    FK CONSTRAINT     v   ALTER TABLE ONLY public.treasurers
    ADD CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES public.users(id_user);
 <   ALTER TABLE ONLY public.treasurers DROP CONSTRAINT fk_user;
       public          angela    false    261    251    4917            �      x������ � �      �   z   x��̱
�@��9y
_��KN��.���C3��B�>��R3�?�v�'pb鈻$*5i��Sɪ��p0���;_,@���(����(�m���'Ri��t]����+Q���[{D� �)It      �   Q   x�}ʱ�0��=$�?��,AEGK�(�_d_}�S	�6ZQ�f���1�u�5�3��>S���f�`yr����uU�l�$      �   `   x����� ��s2E ����,����Ԁ|�d��=bŘ`�p��Ȇ��/���H��єP�".����=�#��T��	�$&h��;���J@�      �   ?   x�����0����$�"�Y:F�W7h�}lP^�G��vjWMuS���	�{�if�0K      �   �   x�Œ1�0���W��ܵT(�aucpqa ��"��4�Ā���]r߻�#�:k�W��	�G�� ����Rk#�!��M!P���� �̓B�J�₝M���S�.�.��u�V����ͭjK���K��T$׬-�e+6�����ZȘB_��HO��Bs�#�'y����J�6�G?�n�z�u��	�k�i���9��QC      �   E   x�}ʹ�0��Tأ�c����2��Mw�僩Š��k�oי��V���K_Di#Y�y�����#�         i   x�m�=
� ��9��(1&�[OѥK�B�����K���o���g?�t�;�X<"d $v����!�G`�qH���R�0�g�x�Ɉ��0��[��1/��4�      �   B   x�}���0����$�DQf��_����A���x�o�zN��8F��g��'P��(�y���a!=      �   �   x���1�0@�9>E/��v'd���� �0�����Q�2x���O��ţzBGX���2\����zG7�>{����T�!��%oJr$Ew�h+qUغe��떓��U���,3�hw�\��L$����J��*�B؝�e� ޮ4�v      �      x������ � �         �   x���=�0���9E.���_��Y"%@���b�H�����g����P��T�B�i^e�5����]"{�Q`��B\�4쑓�bp-��Mk,�9W�rIs������ ����̒�/&��`jpx>^��柧I{m���Y�lũB�D�F      �      x������ � �      �   �   x���M��@�u�)�@IU�(��!�0���J$�:�b<�i��u]��{��"b(��t��?���!1����_�x~nOPB?��E�HvƋ��+^o$�>E�����T��,��D�Y��BFHe�d�s� �Od��Pt�̋PG:Q6C�A�+R}&k�4><
ڧ���n�\�l$5��-�:��e�<��7���+����b&         b   x�}λ�0E������C�Y2F�W(c	�۞�NR�%zQ��=���L�6�������E�K�
/7��z��">>L�����Ì��o���RA5         �   x�}˻
�0���S�-��Q�&�T����6�MJl��!d�ُ�%������0p.��FkE��36H.������&q2�����9��,SV���a�nN���T�nv���ɋʢ���������ҕ�hc�%Ip         �   x�u�1n�0Eg�2'�9�e	Ў���p�@�s���G��J�^�����?|N7����5e�Y�G�'�4�����o}�:�m��)��;6>�O�E�4Z�W��I�FC=�h��
h�{�J}z��|O������z�%N���m��I�_���g��ȨT6q�����Ga���FSH�Ju~-�y�
t+��]�4��mf!         �   x���=�0��>E.�����sfFr@��*�)R�D�峒BJ Mt�L�&�"��������7z�����JэoR:�8J�x���L*!!O�|�!���33?�&��a`7����'4�Z��e����+�E�         T   x�3�t�)M�,�4202�54�50Q04�20�25�343655�2�t/JM�ïȄ325''��*S�u����r���W���� �'            x������ � �         �   x���1�0 ��~�?�(v��x$Ǝ,D�P�� �}�N�t��8�X�'! �ċ,�W�d!�&W���u�'�]7z��Gpm�.�ro��A~}$�&�bq�'�0Ε����}���$l*��X#�"~�\/      
   .   x�3�4�,�4202�54�50Q04�22�20�33��06����� ���         .   x�3�4�,�4202�54�50Q04�22�20�33��06����� ���         �  x����r�0���S�`Y���U���`H�6�f�VbSc���ߨ�>C^�2P
I�Eg��Ҝ��sd��}I�,�Y�v\�T$�R^Ϩe��B@�]P� �G�ؾ�`�X�M;��ؠ
T���NE�(��PRU�o�r+VE&q�V�pԏ��S��#����aZw�uq�����هӇ�OI���Í�`~���rK��ĝy}�> �8�U����RCu/R�ɹ���� �;�������ݠ�k�@��a����]�-�n0K�mM�)�|0��v8��h�~�=����6M4e7�7��-S�po��zc.Е
�f�@�rt�ﻄc�z��.C�N ���^�k��b�u���"��_uF*�֢�/?�G�\�ūj�Px�����v���n�3�e�V��O:�8���F3���W1���W���i��>     