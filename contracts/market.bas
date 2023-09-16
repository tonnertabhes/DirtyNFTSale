Function Initialize() Uint64
10 IF EXISTS("OWNER") THEN GOTO 100
20 STORE("OWNER",SIGNER())
99 RETURN 0
100 RETURN 1
End Function

Function ListNFT(scid String, price Uint64) Uint64
20 IF ASSETVALUE(HEXDECODE(scid)) != 1 THEN GOTO 100
30 STORE(scid+"_price",price)
40 STORE(scid+"_sold",0)
99 RETURN 0
100 RETURN 1
End Function

Function BuyNFT(scid String, recipient String) Uint64
10 IF DEROVALUE() < LOAD(scid+"_price") THEN GOTO 100
20 IF LOAD(scid+"_sold") == 1 THEN GOTO 100
30 SEND_ASSET_TO_ADDRESS(ADDRESS_RAW(recipient),1,HEXDECODE(scid))
40 STORE(scid+"_sold",1)
50 SEND_DERO_TO_ADDRESS(LOAD("OWNER"),DEROVALUE())
99 RETURN 0
100 RETURN 1
End Function