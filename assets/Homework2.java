package Homework;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;
import java.util.*;

import static Homework.Homework1.getSHA;
import static Homework.Homework1.toHex;


public class Homework2 {

	public static byte[] toByteArray(ArrayList<Byte> block) {
		byte[] ByteArray = new byte[block.size()];
		int size = 0;
		for(Byte temp : block){
			ByteArray[size++] = temp;
		}
		return ByteArray;
	}

	public static void main(String args[]) 
	{

		try {
			String bc = "blockchain";
			Byte nonce = 1;

			ArrayList<Byte> block = new ArrayList(Arrays.asList(bc.getBytes(bc)));
			block.add(nonce);

			byte[] d1 = toByteArray(block);
			String s1 = toHex(getSHA(d1));




			BigInteger hash = new BigInteger(s1, 16);
			int diff = 1;

			BigInteger difficulty = new BigInteger("1", 2);
			difficulty = difficulty.shiftLeft(256-diff);

			if (hash.compareTo(difficulty) == -1);




			//System.out.println(hash.toString(2));

		}





		catch (NoSuchAlgorithmException | UnsupportedEncodingException e)
		{
			System.out.println("Exception: " + e);
		}
	}


}