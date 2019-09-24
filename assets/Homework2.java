package Homework;

import java.security.NoSuchAlgorithmException;
import java.math.BigInteger;
import static Homework.Homework1.getSHA;
import static Homework.Homework1.toHex;


public class Homework2 {


	public static String Hash(String bc, long nonce){
		String bcn = bc + nonce;
		byte[] block = bcn.getBytes();
		String Hex = "";
		try {
			Hex = toHex(getSHA(block));
		}
		catch (NoSuchAlgorithmException e) {
		}
		return Hex;
	}

	public static BigInteger FindNonce(String bc, long nonce, BigInteger diff){
		while(true) {
			BigInteger SHA = new BigInteger(Hash(bc, nonce), 16);
			if(SHA.compareTo(diff) == -1){
				return SHA;
			}
			else nonce++;
		}
	}


	public static void main(String args[]) 
	{
		String bc = "blockchain";
		int difficulty = 5;
		long nonce = 1;
		BigInteger diff = BigInteger.ONE.shiftLeft(256-difficulty).add(BigInteger.valueOf(-1));
		System.out.println(FindNonce(bc, nonce, diff).toString(2));

		String str = String.format("%256s", FindNonce(bc, nonce, diff).toString(2)).replace(' ', '0');

		System.out.println(str);
	}
}