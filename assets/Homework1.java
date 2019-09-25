import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Homework1 {

 	public static byte[] getSHA(byte[] input) throws NoSuchAlgorithmException
 	{
 		MessageDigest md = MessageDigest.getInstance("SHA-256");
 		
 		return md.digest(input);
	}

	public static String toHex(byte[] byteData) 
    {
		StringBuffer hash = new StringBuffer();
 		for (byte b : byteData)
		{
			hash.append(String.format("%02x", b));
		}
		return hash.toString();
	}

    public static void main(String args[]) 
    {
        try
        {
        	String s1 = "blockchain homework1";
  	  		byte[] d1 = s1.getBytes();
    		System.out.println(toHex(getSHA(d1)));
       	}
    	catch (NoSuchAlgorithmException e) 
    	{
    		System.out.println("Exception: " + e);
    	}
    }
}
